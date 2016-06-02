﻿// ---------------------------------------------------------------------------------------------------
// <copyright file="Processor.cs" company="Elephant Insurance Services, LLC">
//     Copyright (c) 2015 All Right Reserved
// </copyright>
// <author>Gurpreet Singh</author>
// <date>2015-05-28</date>
// <summary>
//     The Processor class
// </summary>
// ---------------------------------------------------------------------------------------------------

namespace Elephant.Hank.WindowsApplication.Framework.Processes
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading;
    using System.Web.Script.Serialization;

    using Elephant.Hank.WindowsApplication.Framework.ApiHelper;
    using Elephant.Hank.WindowsApplication.Framework.Emailer;
    using Elephant.Hank.WindowsApplication.Framework.FileHelper;
    using Elephant.Hank.WindowsApplication.Framework.Helpers;
    using Elephant.Hank.WindowsApplication.Resources.ApiModels;
    using Elephant.Hank.WindowsApplication.Resources.ApiModels.Enum;
    using Elephant.Hank.WindowsApplication.Resources.ApiModels.Messages;
    using Elephant.Hank.WindowsApplication.Resources.Constants;
    using Elephant.Hank.WindowsApplication.Resources.Extensions;
    using Elephant.Hank.WindowsApplication.Resources.Models;

    /// <summary>
    /// The Processor class
    /// </summary>
    public static class Processor
    {
        /// <summary>
        /// The hub information
        /// </summary>
        private static readonly ConcurrentDictionary<Guid, Hub> HubInfo = new ConcurrentDictionary<Guid, Hub>();

        /// <summary>
        /// The queued test
        /// </summary>
        private static readonly ConcurrentDictionary<Guid, ResultMessage<List<TestQueue>>> QueuedTest = new ConcurrentDictionary<Guid, ResultMessage<List<TestQueue>>>();

        /// <summary>
        /// Executes the service.
        /// </summary>
        public static void ExecuteService()
        {
            try
            {
                var testQueue = TestDataApi.Get<List<TestQueue>>(EndPoints.GetTestQueue);
                if (!testQueue.IsError && testQueue.Item != null && testQueue.Item.Any())
                {
                    var testQueueFirst = testQueue.Item.First();

                    var updateResult = TestDataApi.Get<bool>(string.Format(EndPoints.BulkUpdateTestQueue, testQueueFirst.GroupName, 1));

                    if (!updateResult.IsError)
                    {
                        Hub hub = GetHubBySeleniumAddress(testQueue.Item[0].Settings.SeleniumAddress);
                        if (hub == null)
                        {
                            Hub hubCreated = AddHub(Guid.NewGuid(), testQueue.Item[0].Settings.SeleniumAddress);
                            testQueue.Item.ForEach(x => x.HubInfo = hubCreated);
                            ThreadPool.QueueUserWorkItem(ExecuteServiceThread, testQueue);
                        }
                        else
                        {
                            QueuedTest[Guid.NewGuid()] = testQueue;
                        }
                    }
                }
                else
                {
                    foreach (var item in QueuedTest)
                    {
                        Hub hubPast = GetHubBySeleniumAddress(item.Value.Item[0].Settings.SeleniumAddress);
                        if (hubPast == null)
                        {
                            Hub hubCreated = AddHub(Guid.NewGuid(), item.Value.Item[0].Settings.SeleniumAddress);
                            item.Value.Item.ForEach(x => x.HubInfo = hubCreated);
                            ThreadPool.QueueUserWorkItem(ExecuteServiceThread, item.Value);
                            ResultMessage<List<TestQueue>> h;
                            QueuedTest.TryRemove(item.Key, out h);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                LoggerService.LogException("ExecuteService: " + ex.Message);
            }
        }

        /// <summary>
        /// Executes the service thread.
        /// </summary>
        /// <param name="testQueueData">The test queue data.</param>
        public static void ExecuteServiceThread(object testQueueData)
        {
            try
            {
                ResultMessage<List<TestQueue>> testQueue = testQueueData as ResultMessage<List<TestQueue>>;
                FileGenerator fileGenerator = new FileGenerator(testQueue.Item);
                string directoryName = fileGenerator.GenerateSpecFiles();

                if (!string.IsNullOrWhiteSpace(directoryName))
                {
                    new ProtractorConfigJsBuilder().Create(testQueue.Item[0]);

                    string groupName = testQueue.Item[0].GroupName;

                    TestDataApi.Post(string.Format(EndPoints.SchedulerHistoryStatus, groupName, (int)SchedulerExecutionStatus.InProgress), new List<SchedulerHistory>());

                    ProtractorCommandRunner protractorCommandRunner = new ProtractorCommandRunner();

                    var status = protractorCommandRunner.ExecuteCommand(groupName);

                    TestDataApi.Post(string.Format(EndPoints.SchedulerHistoryStatus, groupName, (int)status), new List<SchedulerHistory>());

                    ProcessUnprocessedResultWithJson(groupName);

                    ProcessEmail(testQueue, groupName);

                    ImageProcessor.ProcessImages(groupName);
                }

                Hub hubInfo = testQueue.Item.First().HubInfo;

                DeleteHub(hubInfo.ProcessId, hubInfo.SeleniumAddress);
            }
            catch (Exception ex)
            {
                ResultMessage<List<TestQueue>> testQueue = testQueueData as ResultMessage<List<TestQueue>>;

                if (testQueue != null && testQueue.Item != null && testQueue.Item.Any())
                {
                    Hub hubInfo = testQueue.Item.First().HubInfo;
                    DeleteHub(hubInfo.ProcessId, hubInfo.SeleniumAddress);
                }

                LoggerService.LogException("ExecuteServiceThread: " + ex.Message);
            }
        }

        /// <summary>
        /// Processes the email.
        /// </summary>
        /// <param name="testQueue">The test queue.</param>
        /// <param name="groupName">Name of the group.</param>
        private static void ProcessEmail(ResultMessage<List<TestQueue>> testQueue, string groupName)
        {
            var emailStatus = SchedulerHistoryEmailStatus.NotSent;

            if (testQueue != null && testQueue.Item != null && groupName.IsNotBlank())
            {
                var schedulerIds = testQueue.Item.Select(x => x.SchedulerId).Distinct();

                var resultData = TestDataApi.Post<SearchReportObject, List<ReportData>>(EndPoints.ReportSearch, new SearchReportObject { ExecutionGroup = groupName });

                if (resultData == null || resultData.IsError)
                {
                    emailStatus = SchedulerHistoryEmailStatus.SendException;
                }
                else if (resultData.Item != null)
                {
                    var emailProcessor = new EmailProcessor();

                    foreach (var schedulerId in schedulerIds)
                    {
                        if (!schedulerId.HasValue)
                        {
                            continue;
                        }

                        var schedularData = TestDataApi.Get<Scheduler>(string.Format(EndPoints.SchedulerById, schedulerId));

                        if (schedularData != null && !schedularData.IsError && schedularData.Item != null)
                        {
                            var repostData = new ReportResultData(resultData.Item, schedularData.Item, groupName);
                            emailStatus = emailProcessor.EmailReport(repostData);
                        }
                    }
                }
            }

            TestDataApi.Post(string.Format(EndPoints.SchedulerHistoryEmailStatus, groupName, (int)emailStatus), new List<SchedulerHistory>());
        }

        /// <summary>
        /// Executes the cleaner.
        /// </summary>
        public static void ExecuteCleaner()
        {
            var settings = SettingsHelper.Get();

            FileFolderRemover.DeleteOldFilesFolders(settings.BaseSpecPath, (uint)settings.ClearLogHours);
            FileFolderRemover.DeleteOldFilesFolders(settings.BaseTestLogPath, (uint)settings.ClearLogHours);
            FileFolderRemover.DeleteOldFilesFolders(settings.LogsLocation, (uint)settings.ClearLogHours);

            FileFolderRemover.DeleteOldFilesFolders(settings.BaseReportPath, (uint)settings.ClearReportHours);
        }

        private static Hub AddHub(Guid processId, string seleniumAddress)
        {
            var hub = new Hub { ProcessId = processId, SeleniumAddress = seleniumAddress };
            HubInfo[processId] = hub;
            return hub;
        }

        private static Hub GetHubBySeleniumAddress(string seleniumAddress)
        {
            return HubInfo.Values.FirstOrDefault(u => u.SeleniumAddress == seleniumAddress);
        }

        private static bool DeleteHub(Guid processId, string seleniumAddress)
        {
            var hub = GetHubBySeleniumAddress(seleniumAddress);
            if (hub != null && HubInfo.ContainsKey(hub.ProcessId))
            {
                Hub h;
                return HubInfo.TryRemove(hub.ProcessId, out h);
            }
            return false;
        }

        private static void ProcessUnprocessedResultWithJson(string groupName)
        {
            try
            {
                var settings = SettingsHelper.Get();
                var resultData = TestDataApi.Get<List<ReportData>>(string.Format(EndPoints.GetAllUnprocessedReports, groupName));
                if (!resultData.IsError)
                {
                    foreach (var item in resultData.Item)
                    {
                        string path = settings.BaseReportPath + "\\" + groupName + "\\JSON\\" + item.TestQueueId + "-" + item.Os.ToLower() + "-" + item.BrowserName.ToLower() + ".json";
                        if (File.Exists(path))
                        {
                            string jsonString = File.ReadAllText(path);
                            JavaScriptSerializer serializer = new JavaScriptSerializer();
                            object output = serializer.Deserialize<object>(jsonString);
                            TestDataApi.Post<object>("api/report", output);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                LoggerService.LogException(ex);
            }
        }
    }
}

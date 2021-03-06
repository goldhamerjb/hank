﻿// ---------------------------------------------------------------------------------------------------
// <copyright file="ExecutionReportStatus.cs" company="Elephant Insurance Services, LLC">
//     Copyright (c) 2015 All Right Reserved
// </copyright>
// <author>Gurpreet Singh</author>
// <date>2015-07-03</date>
// <summary>
//     The ExecutionReportStatus enum
// </summary>
// ---------------------------------------------------------------------------------------------------

namespace Elephant.Hank.Resources.Enum
{
    using Elephant.Hank.Resources.Attributes;

    /// <summary>
    /// The ExecutionReportStatus enum
    /// </summary>
    public enum ExecutionReportStatus
    {
        /// <summary>
        /// The in queue
        /// </summary>
        [DisplayText("In Queue")]
        InQueue = 0,

        /// <summary>
        /// The in progress
        /// </summary>
        [DisplayText("In Progress")]
        InProgress = 1,

        /// <summary>
        /// The loading data
        /// </summary>
        [DisplayText("Loading Test Data")]
        LoadingData = 2,

        /// <summary>
        /// The in execution
        /// </summary>
        [DisplayText("In Execution")]
        InExecution = 3,

        /// <summary>
        /// The completed
        /// </summary>
        [DisplayText("Complete")]
        Completed = 4,

        /// <summary>
        /// The completed
        /// </summary>
        [DisplayText("Cancelled")]
        Cancelled = 5,

        /// <summary>
        /// The passed
        /// </summary>
        [DisplayText("Passed")]
        Passed = 8,

        /// <summary>
        /// The failed
        /// </summary>
        [DisplayText("Failed")]
        Failed = 9,
    }
}

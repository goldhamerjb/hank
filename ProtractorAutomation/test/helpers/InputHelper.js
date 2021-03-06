/**
 * Created by vyom.sharma on 10-02-2015.
 */

var InputHelper = function () {
    require('./WaitReady.js');
    var ActionConstant = require('./../constants/ActionConstant.js');
    var actionConstant = new ActionConstant();
    var maxTimeOut = 10000;
    var screenShotWaitTimeOut = 1000;
    var thisobj = this;
    var LocatorTypeConstant = require('./../constants/LocatorTypeConstant.js');
    var locatorTypeConstant = new LocatorTypeConstant();

    var Transformation = require('./Transformation.js');
    var transformation = new Transformation();

    var JsonHelper = require('./JsonHelper.js');
    var jsonHelper = new JsonHelper();

    var HashTagHelper = require('./HashTagHelper.js');
    var hashTagHelper = new HashTagHelper();

    var Constant = require('./../constants/constant.js');
    var constant = new Constant();

    var ApiTestHelper = require('./../helpers/ApiTestHelper.js');
    var apiTestHelper = new ApiTestHelper();

    var CustomAssertHelper = require('./../helpers/CustomAssertHelper.js');
    var customAssertHelper = new CustomAssertHelper();

    var VariableInitializationHelper = require('./VariableInitializationHelper.js');
    var variableInitializationHelper = new VariableInitializationHelper();

    var fs = require('fs');
    var FS = require("q-io/fs");
    var hotkeys = require('protractor-hotkeys');
    var TakeScreenShot = false;
    var TakeScreenShotBrowser = null;
    var GlobalAutoIncrementArray = [];


    this.setLocator = function (testInstance, testName, takeScreenShot, takeScreenShotBrowser) {
        TakeScreenShot = takeScreenShot != undefined ? takeScreenShot : TakeScreenShot;
        TakeScreenShotBrowser = takeScreenShotBrowser != undefined ? takeScreenShotBrowser : TakeScreenShotBrowser;
        var key = null;
        switch (testInstance.Locator) {
            case locatorTypeConstant.model:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.model(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.model(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.model(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.attributetext:
            {
                element.all(by.tagName('buttons-radio')).then
                (
                    function (buttonsRadio) {
                        for (var i = 0; i < buttonsRadio.length; i++) {
                            (function (i) {
                                buttonsRadio[i].getAttribute('model').then
                                (
                                    function (buttonsRadioModel) {
                                        if (buttonsRadioModel == testInstance.LocatorIdentifier) {
                                            thisobj.setInput(buttonsRadio[i], testInstance);
                                        }
                                    }
                                );
                            })(i);
                        }
                    }
                );
                break;
            }
            case locatorTypeConstant.class:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.css(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.css(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.css(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.tagname:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.tagName(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.tagName(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.tagName(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.id:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.id(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.id(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.id(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.xpath:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.xpath(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.xpath(testInstance.LocatorIdentifier), testInstance);
                    thisobj.setInput(element.all(by.xpath(testInstance.LocatorIdentifier)), testInstance, testName);
                }
                break;
            }
            case locatorTypeConstant.Regex:
            {

                browser.driver.getPageSource().then(function (response) {
                    thisobj.setInput(response, testInstance);
                });
                break;
            }
            case locatorTypeConstant.css:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.css(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.css(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.css(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.ButtonText:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.buttonText(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.buttonText(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.buttonText(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.PartialButtonText:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.partialButtonText(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.partialButtonText(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.partialButtonText(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.LinkText:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.linkText(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.linkText(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.linkText(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }

            case locatorTypeConstant.PartialLinkText:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.partialLinkText(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.partialLinkText(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.partialLinkText(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }

            case locatorTypeConstant.CssContainingText:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.cssContainingText(testInstance.LocatorIdentifier.split('~')[0], testInstance.LocatorIdentifier.split('~')[1])), testInstance);
                }
                else {
                    this.waitReady(by.cssContainingText(testInstance.LocatorIdentifier.split('~')[0], testInstance.LocatorIdentifier.split('~')[1]), testInstance);
                    this.setInput(element(by.cssContainingText(testInstance.LocatorIdentifier.split('~')[0], testInstance.LocatorIdentifier.split('~')[1])), testInstance);
                }
                break;
            }

            case locatorTypeConstant.Name:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.name(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    element(by.name(testInstance.LocatorIdentifier)).waitReady();
                    this.setInput(element(by.name(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }
            case locatorTypeConstant.JS:
            {
                if (testInstance.IsOptional) {
                    this.checkForOptionalElement(element(by.js(testInstance.LocatorIdentifier)), testInstance);
                }
                else {
                    this.waitReady(by.js(testInstance.LocatorIdentifier), testInstance);
                    this.setInput(element(by.js(testInstance.LocatorIdentifier)), testInstance);
                }
                break;
            }

            default :
            {
                if (testInstance.StepType == 4) {
                    browser.getCurrentUrl().then(function (url) {
                        apiTestHelper.callApi(testInstance, function (response) {
                            thisobj.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, response, "");
                        });
                    });
                }
                else {
                    this.setInput("", testInstance);
                }
                break;
            }
        }
        return key;
    };

    this.waitReady = function (elementFinder, testInstance) {
        if (actionConstant.AssertElementToBePresent != testInstance.Action) {
            element(elementFinder).waitReady();
        }
    };

    this.setInput = function (key, testInstance, testName) {
        if (key != null) {
            this.GetSharedVariable(testInstance);
            if (testInstance.VariableName.trim() == '' || testInstance.VariableName.startsWith('#arraycompare') || testInstance.VariableName.startsWith('#arraycontain') || testInstance.Action == actionConstant.ReadAttribute || testInstance.Action == actionConstant.LogText || testInstance.Action == actionConstant.DeclareVariable || testInstance.Action == actionConstant.SetVariable || testInstance.Action == actionConstant.SetVariableManually || testInstance.Action == actionConstant.ReadControlText || testInstance.Action == actionConstant.TransformationOn || testInstance.Action == actionConstant.CloseCurrentTab) {
                switch (testInstance.Action) {
                    case actionConstant.SetText:
                    {
                        if (testInstance.VariableName.trim() == '') {
                            var splitedvalue = testInstance.Value.split("#");
                            if (splitedvalue.length > 1 && splitedvalue[1] == "autoincrement") {
                                browser.getCurrentUrl().then(function (Url) {
                                    jsonHelper.executeAutoIncrement(testInstance).then(function (response) {
                                        testInstance.Value = response;
                                        thisobj.setText(testInstance.ExecutionSequence, key, testInstance.Value, undefined, undefined, testInstance);
                                    });
                                });
                            }
                            else {
                                this.setText(testInstance.ExecutionSequence, key, testInstance.Value, undefined, undefined, testInstance);
                            }
                        }
                        break;
                    }
                    case actionConstant.ClearThenSetText:
                    {
                        this.setText(testInstance.ExecutionSequence, key, testInstance.Value, true, undefined, testInstance);
                        break;
                    }
                    case actionConstant.SetTextByClick:
                    {
                        this.setTextByClick(testInstance.ExecutionSequence, key, testInstance.Value);
                        break;
                    }
                    case actionConstant.SetDropDown:
                    {
                        this.setDropDown(testInstance.ExecutionSequence, key, testInstance.Value);
                        break;
                    }
                    case actionConstant.Click:
                    {
                        var UrlBeforeClick = '';
                        browser.getCurrentUrl().then(function (Url) {
                            UrlBeforeClick = Url;
                        });
                        this.click(testInstance.ExecutionSequence, key, testInstance);
                        if (TakeScreenShot) {
                            if (TakeScreenShotBrowser != null && TakeScreenShotBrowser != undefined) {
                                //*special handling due to web driver bug*//*
                                if (TakeScreenShotBrowser.ConfigName.toUpperCase() == 'CHROME' && TakeScreenShotBrowser.Platform.toUpperCase() == 'WINDOWS') {
                                    TakeScreenShotBrowser.Platform = "XP";
                                }
                                //*special handling due to web driver bug*//*

                                browser.switchTo().alert().then(null, function (e) {
                                    if (e.code == 27) {
                                        browser.getCurrentUrl().then(function (Url) {
                                            browser.sleep(screenShotWaitTimeOut).then(function () {
                                                if (Url != UrlBeforeClick) {
                                                    browser.takeScreenshot().then(function (png) {
                                                        browser.getCapabilities().then(function (capabilities) {
                                                            if (TakeScreenShotBrowser.Platform.toLowerCase() == capabilities.get('platform').toLowerCase() && TakeScreenShotBrowser.ConfigName.toLowerCase() == capabilities.get('browserName').toLowerCase()) {

                                                                var reportPath = jsonHelper.buildPath(browser.params.config.curLocation, browser.params.config.descriptionArray, capabilities) + '.png';
                                                                var reportPathWithBaseDirectory = constant.reportBaseDirectory + "\\" + reportPath;
                                                                var loc = reportPathWithBaseDirectory.substring(0, reportPathWithBaseDirectory.lastIndexOf('\\'));
                                                                FS.isDirectory(loc).then(function (IsExist) {
                                                                    if (IsExist) {
                                                                        fs.writeFileSync(reportPathWithBaseDirectory, png, {encoding: 'base64'});
                                                                        browser.params.config.screenShotArray.push({
                                                                            'Name': Url,
                                                                            'Value': reportPath
                                                                        });
                                                                    }
                                                                    else {
                                                                        FS.makeTree(loc).then(function () {
                                                                            fs.writeFileSync(reportPathWithBaseDirectory, png, {encoding: 'base64'});
                                                                            browser.params.config.screenShotArray.push({
                                                                                'Name': Url,
                                                                                'Value': reportPath
                                                                            });
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        }
                        break;
                    }
                    case actionConstant.CJCustomRadioButton:
                    {
                        this.RadioButtonClick(testInstance.ExecutionSequence, key, testInstance.Value, testInstance);
                        break;
                    }
                    case actionConstant.SetCJCustomAutoCompleteText:
                    {
                        this.setText(testInstance.ExecutionSequence, key, testInstance.Value, true, true, 1);
                        break;
                    }
                    case actionConstant.SetMCJCustomAutoCompleteText:
                    {
                        this.setText(testInstance.ExecutionSequence, key, testInstance.Value, true, true, 2);
                        break;
                    }
                    case actionConstant.AssertCountToEqual:
                    {
                        this.performAssertCountToEqual(testInstance.ExecutionSequence, key, testInstance.Value);
                        break;
                    }
                    case actionConstant.AssertToEqual:
                    {
                        this.assertToEqual(key, testInstance, false);
                        break;
                    }
                    case actionConstant.AssertToEqualIgnoreCase:
                    {
                        this.assertToEqual(key, testInstance, true);
                        break;
                    }
                    case actionConstant.AssertToContain:
                    {
                        this.assertToContain(key, testInstance, false);
                        break;
                    }
                    case actionConstant.AssertToContainIgnoreCase:
                    {
                        this.assertToContain(key, testInstance, true);
                        break;
                    }
                    case actionConstant.AssertNotToEqual:
                    {
                        this.assertNotToEqual(key, testInstance, false);
                        break;
                    }
                    case actionConstant.AssertNotToEqualIgnoreCase:
                    {
                        this.assertNotToEqual(key, testInstance, true);
                        break;
                    }
                    case actionConstant.LogText:
                    {
                        if (testInstance.StepType == 3) {
                            browser.getCurrentUrl().then(function (urle) {

                                jsonHelper.parseJsonToExecuteSql(testInstance).then(function (a) {
                                    browser.params.config.logContainer.push({
                                        Name: testInstance.VariableName,
                                        Value: JSON.stringify(a)
                                    });
                                });

                            });
                        }
                        else {
                            this.LogText(testInstance.ExecutionSequence, key, testName, testInstance.DisplayName);
                        }
                        break;
                    }
                    case actionConstant.WaitForTheElement:
                    {
                        var timeOut = this.isInt(testInstance.Value) ? parseInt(testInstance.Value) : maxTimeOut;
                        this.CheckExpectedCondition(testInstance, false, timeOut);
                        break;
                    }
                    case actionConstant.AssertElementToBePresent:
                    {
                        this.performAssertElementToBePresent(testInstance.ExecutionSequence, key, testInstance.Value);
                        break;
                    }
                    case actionConstant.SetVariable:
                    {
                        if (testInstance.StepType == 3) {
                            browser.getCurrentUrl().then(function (urle) {
                                jsonHelper.parseJsonToExecuteSql(testInstance).then(function (a) {
                                    thisobj.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, JSON.stringify(a), testInstance.DisplayName);
                                    browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                });
                            });
                        }
                        else {
                            if (testInstance.Locator == locatorTypeConstant.Regex) {
                                var val = new RegExp(testInstance.LocatorIdentifier).exec(key);
                                this.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, val[0], testInstance.DisplayName);
                            }
                            else {
                                this.SetSharedVariable(testInstance.ExecutionSequence, key, testInstance.VariableName, testInstance.DisplayName);
                            }
                        }
                        break;
                    }
                    case actionConstant.SetVariableManually:
                    {
                        if (testInstance.Value.indexOf('#') == -1) {

                            this.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, testInstance.Value, testInstance.DisplayName);

                        }
                        else {
                            browser.controlFlow().execute(function () {
                                var response = hashTagHelper.computeHashTags(testInstance.Value).then(function (response) {
                                    thisobj.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, response.toString(), testInstance.DisplayName);
                                });
                            });
                        }
                        break;
                    }
                    case actionConstant.DeclareVariable:
                    {
                        this.DeclareSharedVariable(testInstance.ExecutionSequence, key, testInstance.VariableName);
                        break;
                    }
                    case actionConstant.TakeScreenShot:
                    {
                        browser.takeScreenshot().then(function (png) {
                            browser.getCapabilities().then(function (capabilities) {
                                var reportPath = jsonHelper.buildPath(browser.params.config.curLocation, browser.params.config.descriptionArray, capabilities) + '.png';
                                var reportPathWithBaseDirectory = constant.reportBaseDirectory + "\\" + reportPath;
                                var loc = reportPathWithBaseDirectory.substring(0, reportPathWithBaseDirectory.lastIndexOf('\\'));
                                FS.isDirectory(loc).then(function (IsExist) {
                                    if (IsExist) {
                                        fs.writeFileSync(reportPathWithBaseDirectory, png, {encoding: 'base64'});
                                        browser.params.config.screenShotArray.push({
                                            'Name': testInstance.Value,
                                            'Value': reportPath
                                        });
                                        browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                    }
                                    else {
                                        FS.makeTree(loc).then(function () {
                                            fs.writeFileSync(reportPathWithBaseDirectory, png, {encoding: 'base64'});
                                            browser.params.config.screenShotArray.push({
                                                'Name': Url,
                                                'Value': reportPath
                                            });
                                            browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                        });
                                    }
                                });
                            });
                        });
                        break;
                    }
                    case actionConstant.LoadNewUrl:
                    {
                        browser.getCurrentUrl().then(function (curUrl) {

                            if (testInstance.Value.indexOf("ind#") == 0) {
                                var index = testInstance.Value.split('#')[1];
                                testInstance.Value = browser.params.config.urlStack[index];
                                browser.params.config.urlStack.splice(index, 1);
                            }
                            else {
                                browser.params.config.urlStack.push(curUrl);
                            }

                            browser.executeScript('window.onbeforeunload = null');
                            browser.ignoreSynchronization = true;
                            browser.get(jsonHelper.replaceVariableWithValue(testInstance.Value)).then(function () {
                                browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                            });
                        });
                        break;
                    }
                    case actionConstant.LoadPartialUrl:
                    {
                        browser.getCurrentUrl().then(function (url) {
                            var domain;
                            var protocol = '';
                            //find & remove protocol (http, ftp, etc.) and get domain
                            if (url.indexOf("://") > -1) {
                                protocol = url.split('/')[0];
                                domain = url.split('/')[2];
                            }
                            else {
                                domain = url.split('/')[0];
                            }
                            //find & remove port number
                            domain = domain.split(':')[0];
                            browser.executeScript('window.onbeforeunload = null');
                            browser.ignoreSynchronization = true;
                            browser.get(protocol + '//' + domain + testInstance.Value).then(function () {
                                browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                            });
                        });
                        break;
                    }
                    case actionConstant.SwitchWebsiteType:
                    {
                        if (testInstance.Value.toLowerCase() == 'angular') {
                            console.log("Set  angular");
                            browser.ignoreSynchronization = false;
                        }
                        else {
                            console.log("Set non angular");
                            browser.ignoreSynchronization = true;

                        }
                        break;
                    }
                    case actionConstant.AssertUrlToContain:
                    {
                        browser.getCurrentUrl().then(function (url) {
                            expect(url).toContain(testInstance.Value);
                            browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                        });
                        break;
                    }
                    case actionConstant.HandleBrowserAlertPopup:
                    {
                        if (testInstance.Value.toLowerCase() == 'ok') {
                            browser.driver.switchTo().alert().then(
                                function (alert) {
                                    alert.accept();
                                    browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                },
                                function (error) {
                                    browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                }
                            );
                        }
                        else {
                            browser.driver.switchTo().alert().then(
                                function (alert) {
                                    alert.dismiss();
                                    browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                },
                                function (error) {
                                    browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                                }
                            );
                        }
                        break;
                    }
                    case actionConstant.Wait:
                    {
                        var timeOut = this.isInt(testInstance.Value) ? parseInt(testInstance.Value) : maxTimeOut;
                        browser.sleep(timeOut).then(function () {
                            browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                        });

                        break;
                    }
                    case actionConstant.ScrollToElement:
                    {
                        var scrollToScript = 'document.getElementById("' + testInstance.Value + '").scrollIntoView();';
                        browser.driver.executeScript(scrollToScript).then(function () {
                            browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                        });
                        browser.sleep(1000);
                        break;
                    }
                    case actionConstant.ScrollToTop:
                    {
                        browser.executeScript('window.scrollTo(0,0)');
                        browser.sleep(1000);
                        break;
                    }
                    case actionConstant.ScrollToBottom:
                    {
                        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
                        browser.sleep(1000);
                        break;
                    }
                    case actionConstant.WaitForTheElementDisappear:
                    {
                        var timeOut = this.isInt(testInstance.Value) ? parseInt(testInstance.Value) : maxTimeOut;
                        this.CheckExpectedCondition(testInstance, true, timeOut);
                        break;
                    }
                    case actionConstant.SwitchToWindow:
                    {
                        browser.getAllWindowHandles().then(function (handles) {
                            newWindowHandle = handles[handles.length - 1];
                            browser.switchTo().window(newWindowHandle).then(function () {
                            });
                        });
                        break;
                    }
                    case actionConstant.SendKey:
                    {
                        /* if (testInstance.Value == "ctrl+shift+n") {
                         browser.executeScript("window.open('https://sha99999@admiral.local:V3lv3ttil3@webmail.elephant.com/owa","Ratting","width=1024,height=980,left=150,top=200,toolbar=0,status=0');");
                         }*/
                        hotkeys.trigger(testInstance.Value);
                        break;
                    }
                    case actionConstant.MouseHover:
                    {
                        browser.actions().mouseMove(key).perform();
                        break;
                    }
                    case actionConstant.GWMenuClick:
                    {
                        browser.executeScript("arguments[0].click();", key.getWebElement());
                        break;
                    }
                    case actionConstant.ReadControlText:
                    {
                        jsonHelper.readDataFromHTMLControl(key).then(function (htmlControlData) {
                            thisobj.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, htmlControlData, testInstance.DisplayName);
                        });

                        break;
                    }
                    case actionConstant.SwitchToFrame:
                    {
                        browser.switchTo().frame(testInstance.Value);
                        //browser.wait(3000);
                        break;
                    }
                    case actionConstant.SwitchToDefaultContent:
                    {
                        browser.switchTo().defaultContent();
                        // browser.wait(3000);
                        break;
                    }
                    case actionConstant.LoadReportData:
                    {
                        browser.controlFlow().execute(function () {
                            var RestApiHelper = require('./RestApiHelper.js');
                            var restApiHelper = new RestApiHelper();
                            restApiHelper.doGet(browser.params.config.baseApiUrl + 'api/website/0/report-link-data/' + testInstance.Id + '/' + testInstance.SharedTestDataId, function (resp) {

                                var resultMessage = JSON.parse(resp.body);
                                var variableStateContainer = resultMessage.Item.VariableStates;
                                variableInitializationHelper.setVariables(variableStateContainer);
                                browser.params.config.markReportDataContainer.push({
                                    'ReportDataId': resultMessage.Item.ReportDataId,
                                    'TestId': resultMessage.Item.TestId,
                                    'Status': false
                                });
                            }, function (resp) {
                                // console.log("inside reject callback function ");
                                expect("Call to url= " + browser.params.config.baseApiUrl + 'api/website/0/report-link-data/' + testInstance.Id + '/' + testInstance.SharedTestDataId + "Gives no data").toEqual(" ")
                                Item.VariableStates;
                            });
                        });
                        break;
                    }
                    case actionConstant.MarkLoadReportData:
                    {
                        browser.controlFlow().execute(function () {
                            for (var i = 0; i < browser.params.config.markReportDataContainer.length; i++) {
                                if (browser.params.config.markReportDataContainer[i].TestId == testInstance.LoadReportDataTestId && browser.params.config.markReportDataContainer[i].Status == false) {
                                    browser.params.config.markReportDataContainer[i].Status = true;
                                    var RestApiHelper = require('./RestApiHelper.js');
                                    var restApiHelper = new RestApiHelper();
                                    restApiHelper.doPost(browser.params.config.baseApiUrl + 'api/website/0/report-link-data', {
                                        'ReportDataId': browser.params.config.markReportDataContainer[i].ReportDataId,
                                        'TestId': testInstance.LoadReportDataTestId
                                    }, function (resp) {
                                    }, function (resp) {
                                    });
                                }
                            }
                        });
                        break;
                    }
                    case actionConstant.SetCalenderDate:
                    {
                        var CpCalendarHelper = require('./CpCalendarHelper.js');
                        var calendarHelper = new CpCalendarHelper();
                        if (!!testInstance.VariableName) {
                            browser.controlFlow().execute(function () {
                                var extractedValue = jsonHelper.ExtractVariableValue(testInstance.VariableName);
                                calendarHelper.setCalendarDate(extractedValue);
                            });
                        }
                        else {
                            calendarHelper.setCalendarDate(testInstance.Value);
                        }
                        break;
                    }

                    case actionConstant.ReadAttribute:
                    {
                        key.getAttribute(testInstance.Value).then(function (text) {
                            if (!!text) {
                                thisobj.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, text, testInstance.DisplayName);
                            }
                            else {
                                expect("Attribute with name " + testInstance.Value + " doesn't Not found").toEqual(" ");
                            }
                        });
                        break;
                    }
                    case actionConstant.TransformationOn:
                    {
                        browser.controlFlow().execute(function () {
                            console.log("Inside TransformationOn Action");
                            transformation.set(testInstance);
                        });
                        break;
                    }

                    case actionConstant.TransformationOff:
                    {
                        browser.controlFlow().execute(function () {
                            console.log("Inside TransformationOn Action");
                            transformation.turnOffTransformation(testInstance);
                        });
                        break;
                    }

                    case actionConstant.CloseCurrentTab:
                    {
                        browser.driver.close();
                        break;
                    }

                }
            }
        }
    };

    this.checkForOptionalElement = function (key, testInstance) {
        key.isPresent().then(function (present) {
            if (present) {
                testInstance.IsOptional = false;
                thisobj.setLocator(testInstance);
            }
        });
    };

    this.DeclareSharedVariable = function (executionSequence, key, value) {
        browser.params.config.variableContainer.push({
            Name: value,
            Value: ''
        });
        browser.params.config.LastStepExecuted = executionSequence;
    };

    this.SetSharedVariable = function (executionSequence, key, value, displayName) {
        thisobj.GetText(key, function (text) {
            thisobj.setVariable(executionSequence, value, text, displayName);
        }, true);
    };

    this.setVariable = function (executionSequence, variableName, value, displayName) {
        browser.getCurrentUrl().then(function (urle) {
            var typeofText = typeof(value) + "";
            var flag = false;
            var textVal = ((value == null || typeofText == 'string' ? value : value[0]) + "").replace(/\n/gi, "");
            var variableContainer = browser.params.config.variableContainer;
            for (var k = 0; k < variableContainer.length; k++) {
                if (variableName == variableContainer[k].Name) {
                    variableContainer[k].Value = textVal;
                    variableContainer[k].DisplayName = displayName;
                    browser.params.config.variableStateContainer.push({
                        Name: variableContainer[k].Name,
                        Value: variableContainer[k].Value,
                        DisplayName: displayName
                    });
                    browser.params.config.LastStepExecuted = executionSequence;
                    flag = true;
                    break;
                }
            }

            if (!flag) {
                browser.params.config.variableContainer.push({
                    Name: variableName,
                    Value: textVal,
                    DisplayName: displayName
                });
                browser.params.config.variableStateContainer.push({
                    Name: variableName,
                    Value: textVal,
                    DisplayName: displayName
                });
                browser.params.config.LastStepExecuted = executionSequence;
            }
        });
    };

    this.GetText = function (key, onSuccess, isSetVar) {
        key.getTagName().then(function (tagName) {
            key.getAttribute("hank-data-table").then(function (isHankDataTable) {
                key.getAttribute("hank-data-table-format").then(function (tableFormat) {
                    tagName = (tagName + "").toLowerCase();
                    if (tagName == "input" || tagName == "textarea") {
                        key.getAttribute("value").then(function (attrValue) {
                            onSuccess(attrValue);
                        });
                    }
                    else if (tagName == "select") {
                        key.$('option:checked').getText().then(function (optionText) {
                            onSuccess(optionText);
                        });
                    }
                    else if (tagName == "table" && isSetVar) {
                        var tblData = [];
                        key.all(by.tagName('tr')).each(function (trEle, trInd) {
                            tblData[trInd] = [];
                            trEle.all(by.tagName('td')).each(function (tdEle, tdInd) {
                                tdEle.getText().then(function (text) {
                                    tblData[trInd][tdInd] = text;
                                });
                            });
                        }).then(function () {

                            onSuccess(JSON.stringify(tblData), tblData);
                        });
                    }
                    else if (tagName == "div" && !!isHankDataTable && isSetVar) {
                        var tblData = [];
                        var tr_count = 1;
                        key.all(by.css('.hank-tr')).each(function (trEle, trInd) {
                            //console.log("hank-tr-index= " + trInd);

                            trEle.getAttribute('hank-transaction-type').then(function (transactionType) {
                                trEle.click().then(function () {
                                    tblData[trInd] = [];
                                    //console.log("hank-tr-index)000000000000********= " + trInd + " transactionType= " + transactionType);
                                    trEle.all(by.css('.hank-td')).each(function (tdEle, tdInd) {
                                        tdEle.getText().then(function (text) {
                                            tblData[trInd][tdInd] = text;
                                        });
                                    }).then(function () {
                                        if (transactionType == 'Invoice') {
                                            var invoiceNumber;
                                            trEle.element(by.css('.hank-invoice-number')).getText().then(function (inv) {
                                                //console.log("Invoice Number= " + inv);
                                                invoiceNumber = inv;
                                            });
                                            //console.log("hank-tr-index-1-then********= " + trInd);
                                            //console.log("start tr_count= " + tr_count);
                                            if (trInd == 1) {
                                                tblData[0][tblData[0].length] = 'Idicative Column';
                                                tblData[0][tblData[0].length] = 'Amount Break Up';
                                                tblData[0][tblData[0].length] = 'Invoice Number';
                                            }

                                            //console.log("tblData:- ");
                                            //console.log(tblData);
                                            trEle.all(by.css('.hank-tr-inner')).each(function (trInnerEle, trInnerInd) {
                                                trInnerEle.all(by.css('.hank-td-inner')).each(function (tdInnerEle, tdInnerInd) {

                                                   // console.log("inside start of trInnerEle trInnerInd= " + trInnerInd);
                                                   // console.log("inside start of tdInnerEle tdInnerInd= " + tdInnerInd);

                                                    tdInnerEle.getText().then(function (text) {
                                                        if (tdInnerInd == 0) {
                                                            for (var k = 0; k < tblData[0].length; k++) {
                                                                if (tblData[0][k] == 'Idicative Column') {
                                                                    break;
                                                                }
                                                            }
                                                           // console.log("**indicative k:- " + k + " **tr_count " + tr_count + " text= " + text);
                                                            if (tblData[tr_count] == undefined) {
                                                             //   console.log("inside undefined");
                                                                tblData[tr_count] = [];
                                                                for (var j = 0; j < tblData[tr_count - 1].length; j++) {
                                                                    tblData[tr_count][j] = tblData[tr_count - 1][j];
                                                                }
                                                            }
                                                            //console.log("tblData 0000****:- ");
                                                           // console.log(tblData);
                                                            tblData[tr_count][k] = text;
                                                           // console.log("tblData 11111****:- ");
                                                            //console.log(tblData);
                                                        }
                                                        else {
                                                            for (k = 0; k < tblData[0].length; k++) {
                                                                if (tblData[0][k] == 'Amount Break Up') {
                                                                    break;
                                                                }
                                                            }
                                                            tblData[tr_count][k] = text;
                                                            //console.log("tblData 22222 ****:- ");
                                                            //console.log(tblData);
                                                            //console.log("increaseing tr_count:- " + tr_count);
                                                            for (k = 0; k < tblData[0].length; k++) {
                                                                if (tblData[0][k] == 'Invoice Number') {
                                                                    break;
                                                                }
                                                            }

                                                            //console.log("******************tblData last****************** tr_count= " + tr_count + " k= " + k)
                                                            //console.log(tblData);
                                                            tblData[tr_count][k] = invoiceNumber;
                                                            tr_count++;
                                                        }

                                                    });
                                                });

                                            });


                                        }
                                    });

                                    if (transactionType == 'Payment') {
                                        trEle.all(by.css('.hank-tr-inner')).each(function (trInnerEle, trInnerInd) {
                                            trInnerEle.all(by.css('.hank-td-inner')).each(function (tdInnerEle, tdInnerInd) {
                                                tdInnerEle.getText().then(function (text) {

                                                    if (tdInnerInd == 0) {
                                                        var isHeadExist = false;
                                                        for (var k = 0; k < tblData[0].length; k++) {
                                                            if (tblData[0][k] == text) {
                                                                isHeadExist = true;
                                                                break;
                                                            }
                                                        }
                                                        if (!isHeadExist) {
                                                            tblData[0][tblData[0].length] = text;
                                                        }
                                                    }
                                                    else {
                                                        tdInnerEle.getAttribute("hank-col-name").then(function (innerColName) {
                                                            tdInnerEle.getAttribute("hank-row-index").then(function (rowIndex) {
                                                                for (var k = 0; k < tblData[0].length; k++) {
                                                                    if (tblData[0][k] == innerColName) {
                                                                        tblData[parseInt(rowIndex) + 1][k] = text;
                                                                        break;
                                                                    }
                                                                }
                                                            });
                                                        });

                                                    }
                                                })
                                            })
                                        });
                                    }

                                });
                            });


                        }).then(function () {
                            onSuccess(JSON.stringify(tblData), tblData);
                        });
                    }
                    else {
                        key.getText().then(function (text) {
                            onSuccess(text);
                        });
                    }
                });

            });
        });
    };

    this.GetSharedVariable = function (testInstance) {
        if (testInstance.VariableName.trim() != '' && testInstance.Action != actionConstant.ReadAttribute && testInstance.Action != actionConstant.SetVariable && testInstance.Action != actionConstant.SetVariableManually && testInstance.Action != actionConstant.ReadControlText) {
            if (!testInstance.VariableName.startsWith('#arrayco')) {
                browser.getCurrentUrl().then(function (actualUrl) {

                    var toCompareValue = testInstance.Value;
                    if (testInstance.VariableName.indexOf('[') == -1) {
                        if (testInstance.VariableName.indexOf('{') == -1) {
                            if (testInstance.VariableName.indexOf('#') == -1) {
                                for (var k = 0; k < browser.params.config.variableContainer.length; k++) {
                                    if (testInstance.VariableName == browser.params.config.variableContainer[k].Name) {
                                        testInstance.Value = browser.params.config.variableContainer[k].Value;
                                        break;
                                    }
                                }
                            }
                            else {
                                var variables = testInstance.VariableName.split('#');
                                for (var k = 0; k < browser.params.config.variableContainer.length; k++) {
                                    if (variables[0] == browser.params.config.variableContainer[k].Name) {
                                        testInstance.Value = browser.params.config.variableContainer[k].Value;
                                    }
                                    else if (variables[1] == browser.params.config.variableContainer[k].Name) {
                                        toCompareValue = browser.params.config.variableContainer[k].Value;
                                    }
                                }
                            }
                        }
                        else {
                            for (var k = 0; k < browser.params.config.variableContainer.length; k++) {
                                if (testInstance.VariableName.substring(0, testInstance.VariableName.indexOf('{')) == browser.params.config.variableContainer[k].Name) {
                                    var subStrIndex = testInstance.VariableName.substring(testInstance.VariableName.indexOf('{') + 1, testInstance.VariableName.indexOf('}'));
                                    testInstance.Value = eval("browser.params.config.variableContainer[k].Value.substring(" + subStrIndex + ")");

                                    break;
                                }
                            }
                        }
                    }
                    else {

                        if (testInstance.VariableName.indexOf('#') == -1) {
                            testInstance.Value = jsonHelper.GetIndexedVariableValueFromVariableContainer(testInstance.VariableName);
                        }
                        else {
                            var variables = testInstance.VariableName.split('#');
                            if (variables[0].indexOf('[') == -1) {
                                for (var k = 0; k < browser.params.config.variableContainer.length; k++) {
                                    if (variables[0] == browser.params.config.variableContainer[k].Name) {
                                        testInstance.Value = browser.params.config.variableContainer[k].Value;
                                        break;
                                    }
                                }
                            }
                            else {
                                testInstance.Value = jsonHelper.GetIndexedVariableValueFromVariableContainer(variables[0]);
                            }
                            if (variables[1].indexOf('[') == -1) {
                                for (var k = 0; k < browser.params.config.variableContainer.length; k++) {
                                    if (variables[1] == browser.params.config.variableContainer[k].Name) {
                                        toCompareValue = browser.params.config.variableContainer[k].Value;
                                        break;
                                    }
                                }
                            }
                            else {
                                toCompareValue = jsonHelper.GetIndexedVariableValueFromVariableContainer(variables[1]);
                            }

                        }
                    }

                    if (testInstance.Action != actionConstant.LogText) {
                        testInstance.VariableName = '';

                        if ((testInstance.Action == actionConstant.AssertToEqual || testInstance.Action == actionConstant.AssertToEqualIgnoreCase) && testInstance.DisplayName == null) {
                            testInstance.ToCompareWith = toCompareValue;
                        }

                        thisobj.setLocator(testInstance);
                    }
                });
            }
        }
    };

    this.setText = function (executionSequence, key, value, clearText, isAutoFIll, cjIdentifier) {
        if (value != undefined && value != "") {
            if (clearText) {
                key.clear().then(function () {
                    browser.params.config.LastStepExecuted = executionSequence;
                });
                browser.sleep(3000).then(function () {

                });
            }
            if (isAutoFIll) {
                if (cjIdentifier == 2) {
                    key.sendKeys(value + " ").then(function () {
                        element(by.linkText(value)).click();

                        browser.params.config.LastStepExecuted = executionSequence;
                    });
                }
                else if (cjIdentifier == 1) {
                    var ele = key;
                    var scriptToSet = 'var value = "' + value + '";';
                    scriptToSet += 'var selectedDueDateField = document.getElementById("typeAhead");  var element = angular.element(selectedDueDateField); var property = selectedDueDateField.getAttribute("ng-options");';
                    scriptToSet += 'property = property.substring(property.indexOf("in ") + 3); var scope = element.scope(); var repeater = eval("scope." + property);';
                    scriptToSet += 'for(var i = 0 ; i < repeater.length; i++) { if(repeater[i].Description.toLowerCase() == value.toLowerCase()) { value = repeater[i].Value; } }  ';
                    scriptToSet += 'element.val(value); element.triggerHandler("input");';
                    scriptToSet += 'if(selectedDueDateField && selectedDueDateField.nextSibling && selectedDueDateField.nextSibling.style){selectedDueDateField.nextSibling.style.visibility = "hidden";}';
                    browser.executeScript(scriptToSet).then(function () {
                        browser.params.config.LastStepExecuted = executionSequence;
                    });
                }
            }
            else {
                key.sendKeys(value).then(function () {
                    browser.params.config.LastStepExecuted = executionSequence;
                });
            }
        }
    };

    this.setTextByClick = function (executionSequence, key, value) {
        if (value != undefined && value != "") {
            key.click().then(function () {
                key.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a")).then(function () {
                    key.sendKeys(protractor.Key.BACK_SPACE).then(function () {
                        thisobj.setText(executionSequence, key, value);
                    });
                });
            });
        }
    };

    this.LogText = function (executionSequence, key, testName, displayName) {
        thisobj.GetText(key, function (text) {
            browser.params.config.logContainer.push({Name: displayName, Value: text + ""});
            browser.params.config.LastStepExecuted = executionSequence;
        });
    };

    this.assertNotToEqual = function (key, testInstance, ignoreCase) {
        if (key == "") {
            var expectedVal = jsonHelper.customTrim(testInstance.Value + "");
            var targetVal = jsonHelper.customTrim(testInstance.ToCompareWith + "");

            if (ignoreCase) {
                expectedVal = expectedVal.toUpperCase();
                targetVal = targetVal.toUpperCase();
            }

            expectedVal = !!transformation.getTransformation(expectedVal) ? transformation.getTransformation(expectedVal) : expectedVal;
            targetVal = !!transformation.getTransformation(targetVal) ? transformation.getTransformation(targetVal) : targetVal;

            expect(targetVal).not.toEqual(expectedVal);

            browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
        }
        else {
            this.performAssertOperation(testInstance.ExecutionSequence, key, testInstance.Value, 2, ignoreCase);
        }
    };

    this.assertToEqual = function (key, testInstance, ignoreCase) {
        if (key == "") {
            if (testInstance.VariableName.startsWith('#arraycompare')) {
                browser.getCurrentUrl().then(function (urle) {
                    var splitedVar = testInstance.VariableName.split('#');
                    var assertresult = customAssertHelper.arrayComparisionAssert(splitedVar[2], splitedVar[3], false, transformation);

                    if (assertresult) {

                        expect("both array are equal").toEqual("both array are equal");
                    }
                });
            }
            else if (testInstance.VariableName.startsWith('#arraycontain')) {
                browser.getCurrentUrl().then(function (urle) {
                    var splitedVar = testInstance.VariableName.split('#');
                    var assertresult = customAssertHelper.arrayComparisionAssert(splitedVar[2], splitedVar[3], true);
                    if (assertresult) {
                        expect("array one contains in second array").toEqual("array one contains in second array");
                    }
                });
            }
            else {
                var targetVal = jsonHelper.customTrim(testInstance.Value + "");
                var expectedVal = jsonHelper.customTrim(testInstance.ToCompareWith + "");

                if (ignoreCase) {
                    expectedVal = expectedVal.toUpperCase();
                    targetVal = targetVal.toUpperCase();
                }

                expectedVal = !!transformation.getTransformation(expectedVal) ? transformation.getTransformation(expectedVal) : expectedVal;
                targetVal = !!transformation.getTransformation(targetVal) ? transformation.getTransformation(targetVal) : targetVal;

                expect(targetVal).toEqual(expectedVal);
                browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
            }
        }
        else {
            this.performAssertOperation(testInstance.ExecutionSequence, key, testInstance.Value, 1, ignoreCase);
        }
    };

    this.assertToContain = function (key, testInstance, ignoreCase) {
        if (key == "") {
            if (testInstance.VariableName.startsWith('#arraycontain')) {
                browser.getCurrentUrl().then(function (urle) {
                    var splitedVar = testInstance.VariableName.split('#');
                    var assertresult = customAssertHelper.arrayComparisionAssert(splitedVar[2], splitedVar[3], true);
                    if (assertresult) {
                        expect("array one contains in second array").toEqual("array one contains in second array");
                    }
                });
            }
            else {
                var targetVal = jsonHelper.customTrim(testInstance.Value + "");
                var expectedVal = jsonHelper.customTrim(testInstance.ToCompareWith + "");

                if (ignoreCase) {
                    expectedVal = expectedVal.toUpperCase();
                    targetVal = targetVal.toUpperCase();
                }

                expectedVal = !!transformation.getTransformation(expectedVal) ? transformation.getTransformation(expectedVal) : expectedVal;
                targetVal = !!transformation.getTransformation(targetVal) ? transformation.getTransformation(targetVal) : targetVal;

                expect(targetVal).toContain(expectedVal);
                browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
            }
        }
        else {
            this.performAssertOperation(testInstance.ExecutionSequence, key, testInstance.Value, 3, ignoreCase);
        }
    };

    this.performAssertCountToEqual = function (executionSequence, key, value) {
        key.getText().then(function (item) {

            var expectedVal = item.length + "";
            var targetVal = value;

            expectedVal = !!transformation.getTransformation(expectedVal) ? transformation.getTransformation(expectedVal) : expectedVal;
            targetVal = !!transformation.getTransformation(targetVal) ? transformation.getTransformation(targetVal) : targetVal;

            expect(targetVal).toEqual(expectedVal);
            browser.params.config.LastStepExecuted = executionSequence;
        });
    };

    this.performAssertOperation = function (executionSequence, key, value, operationType, ignoreCase) {
        thisobj.GetText(key, function (_value) {
            ignoreCase = ignoreCase || false;

            var typeofText = typeof(value) + "";
            var textVal = ((value == null || typeofText == 'string' ? value : value[0]) + "").replace(/\n/gi, "");
            textVal = jsonHelper.customTrim(textVal);
            _value = jsonHelper.customTrim(_value);

            if (textVal && ignoreCase) {
                textVal = textVal.toUpperCase();
                _value = _value.toUpperCase()
            }

            _value = !!transformation.getTransformation(_value) ? transformation.getTransformation(_value) : _value;
            textVal = !!transformation.getTransformation(textVal) ? transformation.getTransformation(textVal) : textVal;

            if (operationType == 1) { // To Equals
                expect(_value).toEqual(textVal);
            }
            else if (operationType == 2) { // To not Equals
                expect(_value).not.toEqual(textVal);
            }
            else if (operationType == 3) { // To contains
                expect(_value).toContain(textVal);
            }

            browser.params.config.LastStepExecuted = executionSequence;
        });
    };

    this.performAssertElementToBePresent = function (executionSequence, key, value) {
        if (key.isPresent) {
            key.isPresent().then(function (isPresent) {
                if (isPresent) {
                    expect(key.isDisplayed()).toBe(value == 'true');
                } else {
                    expect(false).toBe(value == 'true');
                }
            });
        } else {
            key.then(function (items) {
                if (items.length == 0) {
                    expect(false).toBe(value == 'true');
                } else {
                    thisobj.performAssertElementToBePresent(executionSequence, items[0], value);
                }
            });
        }
    };

    this.setDropDown = function selectOption(executionSequence, key, value, selectFirst, milliseconds) {
        this.anyTextToBePresentInElement(key, value);
        if (selectFirst || (value == undefined || value == '')) {
            value = "\uE015"; // DOWN arrow
            key.sendKeys(value).then(function () {
                browser.params.config.LastStepExecuted = executionSequence;
            });
        }
        else {
            value = value.replace('  ', ' ').toLowerCase().trim();
            var xpth = "option[translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='" + value + "']";
            console.log("xpth= " + xpth);
            key.element(by.xpath(xpth)).click().then(function () {
                browser.params.config.LastStepExecuted = executionSequence;
            });
        }
    };

    this.click = function (executionSequence, key, testInstance) {
        key.getTagName().then(function (tagName) {

            tagName = (tagName + "").toLowerCase();

            if (tagName == "table" && testInstance.Value && testInstance.Value.indexOf("[") == 0) {
                var searchData = testInstance.Value.split("]~");
                searchData[0] = searchData[0] + "]"; // closing the Arry index

                thisobj.GetText(key, function (aryDataStr, aryData) {
                    var indexes = jsonHelper.GetIndexesFromVariable("var" + searchData[0], aryData);
                    key.all(by.tagName('tr')).each(function (trEle, trInd) {
                        if (trInd == indexes.idxRowVal) {
                            trEle.all(by.tagName('td')).each(function (tdEle, tdInd) {
                                if (tdInd == indexes.idxColVal) {
                                    tdEle.all(by.tagName(searchData[1])).each(function (targetEle, targetIdx) {
                                        targetEle.click();
                                        return;
                                    });
                                }
                            });
                        }
                    });
                }, true);
            }
            else {
                key.click().then(function () {
                    browser.params.config.LastStepExecuted = executionSequence;
                });
            }
        });

    };

    this.RadioButtonClick = function (executionSequence, key, value, ti) {
        key.all(by.tagName('label')).getText().then
        (
            function (txt) {
                for (var j = 0; j < txt.length; j++) {
                    if (txt[j].trim() == value) {
                        key.all(by.tagName('label')).get(j).click().then(function () {
                            browser.params.config.LastStepExecuted = executionSequence;
                        });
                        break;
                    }
                }
            }
        );

    };

    this.isInt = function (value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
    };

    this.GetRepeaterCount = function (key) {
        var deferred = protractor.promise.defer();
        var promise = deferred.promise;
        key.then
        (
            function (repeatersObjectArray) {
                deferred.fulfill(repeatersObjectArray.length + "");
            }
        );
        return promise;
    };

    this.anyTextToBePresentInElement = function (elementFinder, targetText, timeOut) {
        if (targetText) {
            targetText = targetText.replace('  ', ' ').toLowerCase().trim()
        }
        else {
            return;
        }

        if (elementFinder.locator_ && elementFinder.locator_.using == 'xpath') { // Causing isPresent undefined
            return;
        }

        var EC = protractor.ExpectedConditions;
        timeOut = timeOut ? timeOut : maxTimeOut;

        var hasText = function () {
            return elementFinder.getText().then(function (actualText) {
                actualText = actualText.replace('  ', ' ').toLowerCase().trim();
                return actualText.indexOf(targetText) > -1;
            });
        };

        var isElePresentOnUi = function () {
            if (elementFinder.isPresent == undefined) {
                return false;
            }

            return elementFinder.isPresent().then(function (status) {
                return status;
            });
        };

        var expectedConditions = EC.and(isElePresentOnUi, hasText);

        browser.wait(expectedConditions, timeOut);
    };

    this.CheckExpectedCondition = function (testInstance, isNegate, timeOut) {
        timeOut = timeOut ? timeOut : maxTimeOut;

        var EC = protractor.ExpectedConditions;
        var elementObj = undefined;

        switch (testInstance.Locator) {
            case locatorTypeConstant.model:
                elementObj = element(by.model(testInstance.LocatorIdentifier));
                break;
            case locatorTypeConstant.class:
                elementObj = element(by.css(testInstance.LocatorIdentifier));
                break;
            case locatorTypeConstant.tagname:
                elementObj = element(by.tagName(testInstance.LocatorIdentifier));
                break;
            case locatorTypeConstant.id:
                elementObj = element(by.id(testInstance.LocatorIdentifier));
                break;
            case locatorTypeConstant.xpath:
                elementObj = element(by.xpath(testInstance.LocatorIdentifier));
                break;
            case locatorTypeConstant.css:
                elementObj = element(by.css(testInstance.LocatorIdentifier));
                break;
        }

        if (elementObj) {
            var isPresentOnUi = function () {
                return elementObj.isPresent().then(function (status) {
                    return status;
                });
            };

            browser.sleep(4000); // Because of POST back sites, can be higher if site is too slow with post backs
            if (isNegate) {
                browser.wait(EC.not(isPresentOnUi), timeOut);
                browser.sleep(2000);
                browser.wait(EC.not(isPresentOnUi), timeOut);
            }
            else {
                browser.wait(isPresentOnUi, timeOut);
            }
        }
        else {
            // console.log("********** Support not been added for wait for locator '" + testInstance.Locator + "' **********");
            browser.sleep(timeOut);
        }
    };
};
module.exports = InputHelper;

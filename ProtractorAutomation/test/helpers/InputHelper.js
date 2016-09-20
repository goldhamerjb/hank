/**
 * Created by vyom.sharma on 10-02-2015.
 */

var InputHelper = function () {
  require('./WaitReady.js');
  var ActionConstant = require('./../constants/ActionConstant.js');
  var actionConstant = new ActionConstant();
  var maxTimeOut = 10000;
  var thisobj = this;
  var LocatorTypeConstant = require('./../constants/LocatorTypeConstant.js');
  var locatorTypeConstant = new LocatorTypeConstant();

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
      if (testInstance.VariableName.trim() == '' || testInstance.VariableName.startsWith('#arraycompare') || testInstance.VariableName.startsWith('#arraycontain') || testInstance.Action == actionConstant.LogText || testInstance.Action == actionConstant.DeclareVariable || testInstance.Action == actionConstant.SetVariable || testInstance.Action == actionConstant.SetVariableManually || testInstance.Action == actionConstant.ReadControlText) {

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
                      if (Url != UrlBeforeClick) {
                        browser.takeScreenshot().then(function (png) {
                          browser.getCapabilities().then(function (capabilities) {
                            if (TakeScreenShotBrowser.Platform.toLowerCase() == capabilities.caps_.platform.toLowerCase() && TakeScreenShotBrowser.ConfigName.toLowerCase() == capabilities.caps_.browserName.toLowerCase()) {

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
            if (key == "") {
              if (testInstance.VariableName.startsWith('#arraycompare')) {
                browser.getCurrentUrl().then(function (urle) {
                  var splitedVar = testInstance.VariableName.split('#');
                  console.log("Inside Assert to equal's arraycompare testInstance.VariableName= " + testInstance.VariableName);
                  var assertresult = customAssertHelper.arrayComparisionAssert(splitedVar[2], splitedVar[3], false);
                  if (assertresult) {
                    expect("both array are equal").toEqual("both array are equal");
                  }
                });
              }
              else if (testInstance.VariableName.startsWith('#arraycontain')) {
                browser.getCurrentUrl().then(function (urle) {
                  var splitedVar = testInstance.VariableName.split('#');
                  console.log("Inside Assert to equal's arraycontain testInstance.VariableName= " + testInstance.VariableName);
                  var assertresult = customAssertHelper.arrayComparisionAssert(splitedVar[2], splitedVar[3], true);
                  if (assertresult) {
                    expect("array one contains in second array").toEqual("array one contains in second array");
                  }
                });
              }
              else {
                expect(testInstance.Value + "").toEqual(jsonHelper.customTrim(testInstance.ToCompareWith + ""));
                browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
              }
            }
            else {
              this.performAssertOperation(testInstance.ExecutionSequence, key, testInstance.Value, true);
            }
            break;
          }
          case actionConstant.AssertToContain:
          {
            if (key == "") {
              if (testInstance.VariableName.startsWith('#arraycontain')) {
                browser.getCurrentUrl().then(function (urle) {
                  var splitedVar = testInstance.VariableName.split('#');
                  console.log("Inside Assert to equal's arraycontain testInstance.VariableName= " + testInstance.VariableName);
                  var assertresult = customAssertHelper.arrayComparisionAssert(splitedVar[2], splitedVar[3], true);
                  if (assertresult) {
                    expect("array one contains in second array").toEqual("array one contains in second array");
                  }
                });
              }
              else {
                expect(testInstance.Value + "").toContain(jsonHelper.customTrim(testInstance.ToCompareWith + ""));
                browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
              }
            }
            else {
              this.performAssertToContain(testInstance.ExecutionSequence, key, testInstance.Value);
            }
            break;
          }
          case actionConstant.AssertNotToEqual:
          {
            if (key == "") {
              expect(testInstance.Value + "").not.toEqual(jsonHelper.customTrim(testInstance.ToCompareWith + ""));
              browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
            }
            else {
              this.performAssertOperation(testInstance.ExecutionSequence, key, testInstance.Value, false);
            }
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
            browser.controlFlow().execute(function () {
              console.log("Inside the set variable manually");
            });
            if (testInstance.Value.indexOf('#') == -1) {
              this.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, testInstance.Value, testInstance.DisplayName);

            }
            else {
              var response = hashTagHelper.computeHashTags(testInstance.Value).then(function (response) {
                thisobj.setVariable(testInstance.ExecutionSequence, testInstance.VariableName, response.toString(), testInstance.DisplayName);
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
              browser.getCurrentUrl().then(function (actualUrl) {
                browser.get(actualUrl).then(function () {
                  browser.ignoreSynchronization = false;
                  browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                });
              });
            }
            else {
              browser.getCurrentUrl().then(function (actualUrl) {
                browser.get(actualUrl).then(function () {
                  browser.ignoreSynchronization = true;
                  browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
                });
              });
            }
            break;
          }
          case actionConstant.AssertUrlToContain:
          {
            expect(browser.getCurrentUrl()).toContain(testInstance.Value);
            browser.params.config.LastStepExecuted = testInstance.ExecutionSequence;
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
              newWindowHandle = handles[1];
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
          console.log(tblData);
          onSuccess(JSON.stringify(tblData), tblData);
        });
      }
      else {
        key.getText().then(function (text) {
          onSuccess(text);
        });
      }
    });
  };

  this.GetSharedVariable = function (testInstance) {
    if (testInstance.VariableName.trim() != '' && testInstance.Action != actionConstant.SetVariable && testInstance.Action != actionConstant.SetVariableManually && testInstance.Action != actionConstant.ReadControlText) {
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

            if (testInstance.Action == actionConstant.AssertToEqual && testInstance.DisplayName == null) {
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

  this.performAssertCountToEqual = function (executionSequence, key, value) {
    key.getText().then(function (item) {
      expect(item.length + "").toEqual(value);
      browser.params.config.LastStepExecuted = executionSequence;
    });
  };

  this.performAssertOperation = function (executionSequence, key, value, operationFlag) {
    thisobj.GetText(key, function (_value) {
      var typeofText = typeof(value) + "";
      var textVal = ((value == null || typeofText == 'string' ? value : value[0]) + "").replace(/\n/gi, "");
      if (operationFlag) {
        expect(jsonHelper.customTrim(textVal)).toEqual(jsonHelper.customTrim(_value));
      }
      else {
        expect(jsonHelper.customTrim(textVal)).not.toEqual(jsonHelper.customTrim(_value));
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

  this.performAssertToContain = function (executionSequence, key, value) {
    thisobj.GetText(key, function (_value) {
      var typeofText = typeof(value) + "";
      var textVal = ((value == null || typeofText == 'string' ? value : value[0]) + "").replace(/\n/gi, "");
      expect(jsonHelper.customTrim(textVal)).toContain(jsonHelper.customTrim(_value));
      browser.params.config.LastStepExecuted = executionSequence;
    });
  };

  this.setDropDown = function selectOption(executionSequence, key, value, selectFirst, milliseconds) {
    this.anyTextToBePresentInElement(key, value);

    if (selectFirst || (value == undefined || value == '')) {
      value = "\uE015"; // DOWN arrow
      //element(key).sendKeys(value);
      key.sendKeys(value).then(function () {
        browser.params.config.LastStepExecuted = executionSequence;
      });
    }
    else {
      value = value.replace('  ', ' ').toLowerCase().trim();

      var desiredOption;
      var hasMatchedValue = false;
      var count = 0;
      key.all(by.tagName('option')).getText().then
      (
        function findMatchingOption(options) {
          options.some
          (
            function (option) {

              if (option.replace('  ', ' ').toLowerCase().trim() == value) {
                desiredOption = count;
                hasMatchedValue = true;
                return true;
              }
              else {
                count++;
              }
            }
          );
        }
      ).then(function clickOption() {
          if (hasMatchedValue) {
            key.all(by.tagName('option')).get(count).click().then(function () {
              browser.params.config.LastStepExecuted = executionSequence;
            });
          }
          else {

          }
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
      console.log("********** Support not been added for wait for locator '" + testInstance.Locator + "' **********");
      browser.sleep(timeOut);
    }
  };
};
module.exports = InputHelper;

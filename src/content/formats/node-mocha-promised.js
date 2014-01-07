/*
 * Formatter for Selenium 2 / WebDriver RSpec client.
 */

if (!this.formatterType) {  // this.formatterType is defined for the new Formatter system
    // This method (the if block) of loading the formatter type is deprecated.
    // For new formatters, simply specify the type in the addPluginProvidedFormatter() and omit this
    // if block in your formatter.
    var subScriptLoader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
    subScriptLoader.loadSubScript('chrome://selenium-ide/content/formats/webdriver.js', this);
}

function testClassName(testName) {
    return testName.split(/[^0-9A-Za-z]+/).map(
            function(x) {
                return capitalize(x);
            }).join('');
}

function testMethodName(testName) {
    return "test_" + underscore(testName);
}

function nonBreakingSpace() {
    return "\"\\xa0\"";
}

function array(value) {
    var str = '[';
    for (var i = 0; i < value.length; i++) {
        str += string(value[i]);
        if (i < value.length - 1)
            str += ", ";
    }
    str += ']';
    return str;
}

notOperator = function() {
    return "not ";
};

Equals.prototype.toString = function() {
    //to check
    return ".should.be.equal(" + this.e1.toString() + ')';
};

Equals.prototype.assert = function() {
    //to check
    return ".should.be.equal(" + this.e2.toString() + ')';
};

Equals.prototype.verify = function() {
    return verify(this.assert());
};

NotEquals.prototype.toString = function() {
    //to check
    return "(" + this.e1.toString() + ").should.not.be.equal(" + this.e2.toString() + ")";
};

NotEquals.prototype.assert = function() {
    //to check
    return "(" + this.e1.toString() + ").should.not.be.equal(" + this.e2.toString() + ")";
};

NotEquals.prototype.verify = function() {
    return verify(this.assert());
};

function joinExpression(expression) {
    return expression.toString() + ".join(\",\")";
}

function statement(expression) {
    expression.noBraces = true;
    return expression.toString();
}

function assignToVariable(type, variable, expression) {
    return variable + " = " + expression.toString() + ";";
}

function ifCondition(expression, callback) {
    return "if (" + expression.toString() + ") {\n" + callback() + "}";
}

function tryCatch(tryStatement, catchStatement, exception) {
    return "try{\n" +
            indents(1) + tryStatement + "\n" +
            "} catch(err){\n" +
            "rescue " + exception + " => ex\n" +
            indents(1) + catchStatement + "\n" +
            "}";
}

function assertTrue(expression) {
    return "return " + expression.toString() + ".should.to.be.true";
}

function assertFalse(expression) {
    return "return " + expression.invert().toString() + ".should.to.be.false";
}

//to re-check
function verify(statement) {
    return statement;
}

function verifyTrue(expression) {
    return verify(assertTrue(expression));
}

function verifyFalse(expression) {
    return verify(assertFalse(expression));
}

RegexpMatch.patternAsRegEx = function(pattern) {
    var str = pattern.replace(/\//g, "\\/");
    if (str.match(/\n/)) {
        str = str.replace(/\n/g, '\\n');
        return '/' + str + '/m';
    } else {
        return str = '/' + str + '/';
    }
};

RegexpMatch.prototype.patternAsRegEx = function() {
    return RegexpMatch.patternAsRegEx(this.pattern);
};

RegexpMatch.prototype.toString = function() {
    return this.expression + " =~ " + this.patternAsRegEx();
};

RegexpMatch.prototype.assert = function() {
    return this.expression + ".should.to.match(" + this.patternAsRegEx() + ")";
};

RegexpMatch.prototype.verify = function() {
    return verify(this.assert());
};

RegexpNotMatch.prototype.patternAsRegEx = function() {
    return RegexpMatch.patternAsRegEx(this.pattern);
};

RegexpNotMatch.prototype.toString = function() {
    return this.expression + " !~ " + this.patternAsRegEx();
};

RegexpNotMatch.prototype.assert = function() {
    return this.expression + ".should.not.to.match(" + this.patternAsRegEx() + ")";
};

RegexpNotMatch.prototype.verify = function() {
    return verify(this.assert());
};

function waitFor(expression) {
//  if (expression.negative) {
//    return "!60.times{ break unless (" + expression.invert().toString() + " rescue true); sleep 1 }"
//  } else {
//    return "!60.times{ break if (" + expression.toString() + " rescue false); sleep 1 }"
//  }
    //return "browser.sleep(" + (parseInt(milliseconds) / 1000) + ")";
    return "/*waitFor*/\n";
}

function assertOrVerifyFailure(line, isAssert) {
    /*return "assert_raise(Kernel) { " + line + "}";*/
    return "/*assertOrVerifyFailure*/";
}

function pause(milliseconds) {
    return "browser.sleep(" + (parseInt(milliseconds) / 1000) + ")";
}

function echo(message) {
    return "console.log(" + xlateArgument(message) + ")";
}

function formatComment(comment) {
    return comment.comment.replace(/.+/mg, function(str) {
        return "// " + str;
    });
}

function keyVariable(key) {
    return ":" + key;
}

this.sendKeysMaping = {
    BKSP: "backspace",
    BACKSPACE: "backspace",
    TAB: "tab",
    ENTER: "enter",
    SHIFT: "shift",
    CONTROL: "control",
    CTRL: "control",
    ALT: "alt",
    PAUSE: "pause",
    ESCAPE: "escape",
    ESC: "escape",
    SPACE: "space",
    PAGE_UP: "page_up",
    PGUP: "page_up",
    PAGE_DOWN: "page_down",
    PGDN: "page_down",
    END: "end",
    HOME: "home",
    LEFT: "left",
    UP: "up",
    RIGHT: "right",
    DOWN: "down",
    INSERT: "insert",
    INS: "insert",
    DELETE: "delete",
    DEL: "delete",
    SEMICOLON: "semicolon",
    EQUALS: "equals",
    NUMPAD0: "numpad0",
    N0: "numpad0",
    NUMPAD1: "numpad1",
    N1: "numpad1",
    NUMPAD2: "numpad2",
    N2: "numpad2",
    NUMPAD3: "numpad3",
    N3: "numpad3",
    NUMPAD4: "numpad4",
    N4: "numpad4",
    NUMPAD5: "numpad5",
    N5: "numpad5",
    NUMPAD6: "numpad6",
    N6: "numpad6",
    NUMPAD7: "numpad7",
    N7: "numpad7",
    NUMPAD8: "numpad8",
    N8: "numpad8",
    NUMPAD9: "numpad9",
    N9: "numpad9",
    MULTIPLY: "multiply",
    MUL: "multiply",
    ADD: "add",
    PLUS: "add",
    SEPARATOR: "separator",
    SEP: "separator",
    SUBTRACT: "subtract",
    MINUS: "subtract",
    DECIMAL: "decimal",
    PERIOD: "decimal",
    DIVIDE: "divide",
    DIV: "divide",
    F1: "f1",
    F2: "f2",
    F3: "f3",
    F4: "f4",
    F5: "f5",
    F6: "f6",
    F7: "f7",
    F8: "f8",
    F9: "f9",
    F10: "f10",
    F11: "f11",
    F12: "f12",
    META: "meta",
    COMMAND: "command"
};

/**
 * Returns a string representing the suite for this formatter language.
 *
 * @param testSuite  the suite to format
 * @param filename   the file the formatted suite will be saved as
 */
function formatSuite(testSuite, filename) {
    formattedSuite =
            "require('mocha-as-promised')();\n" +
            "require('colors');" +
            "var chai = require('chai');" +
            "var chaiAsPromised = require('chai-as-promised');" +
            "chai.use(chaiAsPromised);\n" +
            "chai.should();\n" +
            "var wd;\n" +
            "try {\n" +
            "    wd = require('wd');\n" +
            "} catch (err) {\n" +
            "    wd = require('../../lib/main');\n" +
            "}\n" +
            "// enables chai assertion chaining\n" +
            "chaiAsPromised.transferPromiseness = wd.transferPromiseness;\n" +
            "describe('mocha spec examples', function() {\n" +
            "    this.timeout(10000);\n" +
            "    // using mocha-as-promised and chai-as-promised is the best way\n" +
            "    describe('using mocha-as-promised and chai-as-promised', function() {\n" +
            "        var browser;\n" +
            "        before(function() {\n" +
            "            browser = wd.promiseChainRemote('');\n" +
            "            return browser\n" +
            "                    .init();\n" +
            "        });\n\n\n";
    ;

    formattedSuite +=
            "   beforeEach(function() {\n" +
            "       return browser.get('');\n" +
            "   });\n\n" +
            "   after(function() {\n" +
            "       return browser\n" +
            "               .quit();\n" +
            "   });\n\n" +
            "   /* the test cases should to be here */\n\n";

    formattedSuite += 
            "    });" +
            "});";


    return formattedSuite;
}

function defaultExtension() {
    return this.options.defaultExtension;
}

this.options = {
    receiver: "browser",
    showSelenese: 'false',
    header: 'it("${methodName}", function() {\n return ${receiver}\n',
    footer: '; \n });',
    indent: "2",
    initialIndents: "2",
    defaultExtension: "rb"
};

this.configForm =
        '<description>Variable for Selenium instance</description>' +
        '<textbox id="options_receiver" />' +
        '<description>Header</description>' +
        '<textbox id="options_header" multiline="true" flex="1" rows="4"/>' +
        '<description>Footer</description>' +
        '<textbox id="options_footer" multiline="true" flex="1" rows="4"/>' +
        '<description>Indent</description>' +
        '<menulist id="options_indent"><menupopup>' +
        '<menuitem label="Tab" value="tab"/>' +
        '<menuitem label="1 space" value="1"/>' +
        '<menuitem label="2 spaces" value="2"/>' +
        '<menuitem label="3 spaces" value="3"/>' +
        '<menuitem label="4 spaces" value="4"/>' +
        '<menuitem label="5 spaces" value="5"/>' +
        '<menuitem label="6 spaces" value="6"/>' +
        '<menuitem label="7 spaces" value="7"/>' +
        '<menuitem label="8 spaces" value="8"/>' +
        '</menupopup></menulist>' +
        '<checkbox id="options_showSelenese" label="Show Selenese"/>';

this.name = "node-mocha-promised";
this.testcaseExtension = ".js";
this.suiteExtension = ".js";
this.webdriver = true;

WDAPI.Driver = function() {
    this.ref = options.receiver;
};

WDAPI.Driver.searchContext = function(locatorType, locator) {
    var locatorString = xlateArgument(locator);
    switch (locatorType) {
        case 'xpath':
            return '\'xpath\', ' + locatorString;
        case 'css':
            return '\'css selector\', ' + locatorString;
        case 'class_name':
            return '\'class name\', ' + locatorString;
        case 'id':
            return '\'id\', ' + locatorString;
        case 'link':
            return '\'link text\', ' + locatorString;
        case 'partial_link':
            return '\'partial link text\', ' + locatorString;
        case 'name':
            return '\'name\', ' + locatorString;
        case 'tag_name':
            return '\'tag name\', ' + locatorString;
    }
    throw 'Error: unknown strategy [' + locatorType + '] for locator [' + locator + ']';
};

WDAPI.Driver.prototype.back = function() {
    return ".back()";
};

WDAPI.Driver.prototype.close = function() {
    return ".close()";
};

WDAPI.Driver.prototype.findElement = function(locatorType, locator) {
    return new WDAPI.Element(".element(" + WDAPI.Driver.searchContext(locatorType, locator) + ")");
};

WDAPI.Driver.prototype.findElements = function(locatorType, locator) {
    return new WDAPI.ElementList(".elements(" + WDAPI.Driver.searchContext(locatorType, locator) + ")");
};

WDAPI.Driver.prototype.getCurrentUrl = function() {
    return ".url()";
};

WDAPI.Driver.prototype.get = function(url) {
    if (url.length > 1 && (url.substring(1, 8) == "http://" || url.substring(1, 9) == "https://")) { // url is quoted
        return ".get(" + url + ")";
    } else {
        return ".get(base_url + " + url + ")";
    }
};

WDAPI.Driver.prototype.getTitle = function() {
    return ".title()";
};

WDAPI.Driver.prototype.getAlert = function() {
    return ".alertText()";
};

WDAPI.Driver.prototype.chooseOkOnNextConfirmation = function() {
    return ".acceptAlert()";
};

WDAPI.Driver.prototype.chooseCancelOnNextConfirmation = function() {
    return ".dismissAlert()";
};

WDAPI.Driver.prototype.refresh = function() {
    return ".refresh()";
};

WDAPI.Element = function(ref) {
    this.ref = ref;
};

WDAPI.Element.prototype.clear = function() {
    return this.ref + ".clear()";
};

WDAPI.Element.prototype.click = function() {
    return this.ref + ".click()";
};

WDAPI.Element.prototype.getAttribute = function(attributeName) {
    return this.ref + ".getAttribute(" + xlateArgument(attributeName) + ")";
};

WDAPI.Element.prototype.getText = function() {
    return this.ref + ".text()";
};

WDAPI.Element.prototype.isDisplayed = function() {
    return this.ref + ".isDisplayed()";
};

WDAPI.Element.prototype.isSelected = function() {
    return this.ref + ".isSelected()";
};

WDAPI.Element.prototype.sendKeys = function(text) {
    return this.ref + ".type(" + xlateArgument(text, 'args') + ")";
};

WDAPI.Element.prototype.submit = function() {
    return this.ref + ".submit()";
};

WDAPI.Element.prototype.select = function(selectLocator) {
    if (selectLocator.type == 'index') {
        return "Selenium::WebDriver::Support::Select.new(" + this.ref + ").select_by(:index, " + selectLocator.string + ")";
    }
    if (selectLocator.type == 'value') {
        return "Selenium::WebDriver::Support::Select.new(" + this.ref + ").select_by(:value, " + xlateArgument(selectLocator.string) + ")";
    }
    return "Selenium::WebDriver::Support::Select.new(" + this.ref + ").select_by(:text, " + xlateArgument(selectLocator.string) + ")";
};

WDAPI.ElementList = function(ref) {
    this.ref = ref;
};

WDAPI.ElementList.prototype.getItem = function(index) {
    return this.ref + "[" + index + "]";
};

WDAPI.ElementList.prototype.getSize = function() {
    return this.ref + ".length()";
};

WDAPI.ElementList.prototype.isEmpty = function() {
    return this.ref + ".empty()";
};


WDAPI.Utils = function() {
};

WDAPI.Utils.isElementPresent = function(how, what) {
    //to check
    return this.ref + ".elementIfExists('" + how + "', '" + xlateArgument(what) + "')";
};

WDAPI.Utils.isAlertPresent = function() {
    //todo
    return ".alertText()";
};

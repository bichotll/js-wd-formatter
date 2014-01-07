#Javascript wd Formatter - Selenium IDE wd formatter extension

##Intro

This firefox plugin will give you the tools to export your test cases to code. With it you will be able to run and improve your selenium tests using [wd](https://github.com/admc/wd).

##How to install

For the moment I'm just improving it, that's why I haven't created any firefox plugin executable file or even tag version.
Anyway, if you want to test it (yes, it works), you can follow the next tutorial:
[How to develop a firefox extension](http://blog.mozilla.org/addons/2009/01/28/how-to-develop-a-firefox-extension/)
Check "Packaging and installing" section.

***

##Mocha promised formatter

This is the first formatter.

####Created code example:
```js
        it("test_selenium", function() {
            return browser
                    .get("https://localhost/")
                    .element('id', "form_phoneCustomer").clear()
                    .element('id', "form_phoneCustomer").type("630410410")
                    .element('id', "form_password").clear()
                    .element('id', "form_password").type("Pa$$w0rd")
                    .element('id', "form_submit").click()
                    ;
        });
```

*There is so stuff to improve and check. Good to remove work but.

***

#FAQ

##How can I help?

Simple, just fork it and create the new wd formatter or improving/fixing the existing ones.

##Is it going to be improved?

Well, I just created it (mocha promised) because I needed for a project. So in theory, yes.

***

##More info
 - [wd](https://github.com/admc/wd) As its description says: A node.js client for webdriver/selenium 2.
 - [Selenium IDE](http://docs.seleniumhq.org/projects/ide/)
 - [StackOverflow](http://stackoverflow.com/questions/15167178/selenium-formatter-modification-export-to-webdriver-backed-java)

var fs = require('fs');

describe('SQL Script Generator', function() {
    it('should have a title', function() {
        browser.get('http://localhost:8000/public');
        expect(browser.getTitle()).toEqual('SqlScriptGen');
    });

    it('should only allow download filled form', function(){
        browser.get('http://localhost:8000/public');

        expect(element(by.id('submit')).isEnabled()).toBe(false);
        element(by.id('name')).sendKeys('nome');
        element(by.id('schema')).sendKeys('nome');
        element(by.id('env')).sendKeys('nome');
        element(by.id('scriptQuery')).sendKeys('script');

        expect(element(by.id('submit')).isEnabled()).toBe(true);
    });

    it('should download a file', function(){
        browser.get('http://localhost:8000/public');

        element(by.id('name')).sendKeys('nome');
        element(by.id('schema')).sendKeys('nome');
        element(by.id('env')).sendKeys('nome');
        element(by.id('scriptQuery')).sendKeys('script');
        element(by.id('submit')).click();

        var now = new Date().toISOString().slice(0,10).replace(/-/g,"");

        browser.sleep(1000).then(function() {
            expect(fs.statSync(now + '_nome.sql').isFile()).toEqual(true);
            fs.unlinkSync(now + '_nome.sql');
        });
    });
});

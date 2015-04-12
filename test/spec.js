var config = require('./settings.js');

var findByName = function(name) {
			return browser.driver.findElement(by.name(name));
 };
	
var findById = function(id) {
			return browser.driver.findElement(by.id(id));
 };
	
describe('contentNode', function() {

	afterEach(function(){
		console.log("some test finished")		
	});
		
	
	it('should get page title', function() {
		browser.get(config.url);
		expect(browser.getTitle()).toEqual('ScriptGen');
  });	

});

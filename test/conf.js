// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  capabilities: {
		'browserName': 'chrome',
    'chromeOptions': {
			'args': ['show-fps-counter=true']
		}
  },
	// Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
}
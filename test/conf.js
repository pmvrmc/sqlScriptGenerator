exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'prefs': {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': 'C:\\Projects\\scriptgenerator\\test',
                }
            }
        }
    }
}

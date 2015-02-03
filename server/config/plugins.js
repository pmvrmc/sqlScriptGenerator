module.exports = function(server) {
    // Options to pass into the 'Good' plugin
    var goodOptions = {
        subscribers: {
            console: ['ops', 'request', 'log', 'error']
        }
    };

    // The Assets Configuration Options
    var assetOptions = require('../../assets');

    server.pack.register([
        {
            plugin: require("good"),
            options: goodOptions
        }
    ], function(err) {
        if (err) throw err;
    });
};

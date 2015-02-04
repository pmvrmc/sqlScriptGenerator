var Hapi = require('hapi');
var config = require('getconfig');

var assetsApi = require('./server/routes/assetsApi');
var scriptApi = require('./server/routes/scriptApi');


var server = new Hapi.Server();
server.connection({
  host: config.http.listen,
  port: config.http.port
});

server.views({
  path: './server/views',
  engines: {
    html: require('swig')
  }
});

//Register the API
server.register([assetsApi, scriptApi], function (err) {
  if(err) throw err;
});

// Start the server
server.start(function (err) {
  if(err) throw err;
  console.log('Server started at: ' + server.info.uri);
});

var fs = require('fs');
var dateFormat = require('dateformat');

module.exports = {

    index: {
        handler: function(request, reply){
            reply.view('index');
        }
    },

    getScript: {
        handler: function(request, reply){
            textify(request.params.fileName, request.payload, function(err, sqlFileName){
              if(err) throw err;
              return reply.file('./scripts/'+ sqlFileName);
            });

            function textify(scriptName, script, callback){
              if(script == null){
                var no_script_error = new Error('Script is null');
                no_script_error.null_script = true;
                callback(no_script_error, null);
              }
              var options = { encoding: 'utf8' };
              var ws = fs.createWriteStream('./scripts/' + scriptName, options);
              if(script.objective || script.target || script.procedure || script.expectedResult){
                  if(script.objective) ws.write('/*\n\tObjectivo: ' + script.objective + '\n\t');
                  if(script.objective) ws.write('\tAlvo: ' + script.target + '\n\t');
                  if(script.objective) ws.write('\tProdecimento: ' + script.procedure + '\n\t');
                  if(script.objective) ws.write('\tResultado Esperado: ' + script.expectedResult + '\n*/\n');
              }
              ws.write('SPOOL G:\\AGOC-NP\\NP\\Operacao\\logs\\' + script.schema+ '\\' +
                        dateFormat(script.date, 'yyyymmdd') + '\\' +
                        dateFormat(script.date, 'yyyymmdd') + '_' + script.name + '.log\n');
              ws.write('\nset echo on;\n\n');
              ws.write(script.query);
              ws.end('\n\ncommit;\n\nset echo off;\n\nSPOOL OFF');
              return callback(null, scriptName);
            };
        }
    },

    missing: {
        handler: function(request, reply){
            reply.view('404', {
                title: 'You found a missing page, but won the 404 error!'
            }).code(404);
        },
        app: {
            name: '404'
        }
    }
}

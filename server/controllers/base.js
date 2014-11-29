var fs = require('fs');
var dateFormat = require('dateformat');

module.exports = {

    index: {
        handler: function(request, reply){
            reply.view('index');
        }
    },

    createScript: {
        handler: function(request, reply){
            createSqlScript(request.params.fileName, request.payload, function(err, sqlFileName){
              if(err) throw err;
              reply(sqlFileName);
            });

            function createSqlScript(scriptName, script, callback){
              if(script == null){
                var no_script_error = new Error('Script is null');
                no_script_error.null_script = true;
                return callback(no_script_error, null);
              }
              var options = { encoding: 'windows-1252' };
              var ws = fs.createWriteStream('./scripts/' + scriptName, options);
              if(script.objective || script.target || script.procedure || script.expectedResult){
                  ws.write('/*\n');
                  if(script.objective) ws.write('\tObjectivo: ' + script.objective + '\n');
                  if(script.target) ws.write('\tAlvo: ' + script.target + '\n');
                  if(script.procedure) ws.write('\tProdecimento: ' + script.procedure + '\n');
                  if(script.expectedResult) ws.write('\tResultado Esperado: ' + script.expectedResult + '\n');
                  ws.write('*/\n');
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
    getScript: {
      handler: function(request, reply){
        fs.stat('./scripts/'+ request.params.fileName, function(err, stat) {
          if(err == null) {
            return reply.file('./scripts/'+ request.params.fileName);
          }
          reply.view('404', {
              title: 'You found a missing page, but won the 404 error!'
          }).code(404);
        });
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

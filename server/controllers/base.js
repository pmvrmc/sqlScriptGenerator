var fs = require('fs');

module.exports = {

    index: {
        handler: function(request, reply){
            reply.view('index');
        }
    },

    postScript: {
        handler: function(request, reply){
            textify(request.payload.script, function(err, sqlFileStream){
              if(err) throw err;
              reply.pipe(sqlFileStream);
            });

            function textify(script, callback){
              if(script == null){
                var no_script_error = new Error('Script is null');
                no_script_error.null_script = true;
                callback(no_script_error, null);
              }
              var ws = fs.createWriteStream(script.date + '_' + script.name + '.sql');
              if(script.objective || script.target || script.procedure || script.expectedResult){
                  if(script.objective) ws.write('/*\n\tObjectivo: ' + script.objective + '\n\t');
                  if(script.objective) ws.write('\tAlvo: ' + script.target + '\n\t');
                  if(script.objective) ws.write('\tProdecimento: ' + script.procedure + '\n\t');
                  if(script.objective) ws.write('\tResultado Esperado: ' + script.expectedResult + '\n*/\n');
              }
              ws.write('SPOOL G:\\AGOC-NP\\NP\\Operacao\\logs\\' + script.schema+ '\\' + script.date + '\\' + script.date + '_' + script.name + '.log\n');
              ws.write('\nset echo on;\n');
              ws.write(script.query);
              ws.write('\ncommit;\n\nset echo off;\n\nSPOOL OFF');
              callback(null, ws);
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

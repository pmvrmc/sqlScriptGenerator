var fs = require('fs');
var dateFormat = require('dateformat');
var Joi = require('joi');

module.exports = {

    index: {
        handler: function(request, reply){
            reply.view('index');
        }
    },

    createScript: {
      handler: function(request, reply){
        var schemaParams = Joi.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]_.+\.sql$/);
        Joi.validate(request.params.fileName, schemaParams, function(err, value){
          if(err) reply.view('404', { title: 'You found a missing page, but won the 404 error!'}).code(404);
          var schemaPayload = {
            name: Joi.string().required(),
            schema: Joi.string().required(),
            query: Joi.string().required(),
            objective: Joi.string(),
            target: Joi.string(),
            procedure: Joi.string(),
            expectedResult: Joi.string(),
            date: Joi.date().required()
          }
          Joi.validate(request.payload, schemaPayload, function(err, value){
            if(err) reply.view('404', { title: 'You found a missing page, but won the 404 error!'}).code(404);
            fs.mkdir('./scripts/', function(error){
              if(!error || (error && error.code === 'EEXIST')){
                createSqlScript(request.params.fileName, request.payload, function(err, sqlFileName){
                  if(err) throw err;
                  reply(sqlFileName);
                });
              }
            });
          });
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
		  ws.write('\nset echo on;\n');
		  ws.write('\nALTER SESSION SET current_schema=' + script.schema + ';\n');
		  ws.write('\nALTER SESSION SET NLS_DATE_FORMAT=\'YYYY-MM-DD HH24:MI:SS\';\n\n');
          ws.write(script.query);
          ws.end('\n\ncommit;\n\nset echo off;\n\nSPOOL OFF');
          return callback(null, scriptName);
        };
      }
    },
    getScript: {
      handler: function(request, reply){
        var schemaParams = Joi.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]_.+\.sql$/);
        Joi.validate(request.params.fileName, schemaParams, function(err, value){
          if(err) reply.view('404', {title: 'You found a missing page, but won the 404 error!'}).code(404);

          fs.stat('./scripts/'+ request.params.fileName, function(err, stat) {
            if(err) reply.view('404', {title: 'You found a missing page, but won the 404 error!'}).code(404);
            return reply.file('./scripts/'+ request.params.fileName);
          });
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

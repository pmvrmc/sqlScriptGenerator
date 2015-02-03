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
      validate:{
        params: {
          fileName : Joi.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]_.+\.sql$/)
        },
        payload:{
          name: Joi.string().required(),
          schema: Joi.string().required(),
          env: Joi.string().required(),
          query: Joi.string().required(),
          date: Joi.date().required(),
          commit: Joi.number().min(0).max(100).required()
        }
      },

      handler: function(request, reply){
        fs.mkdir('./scripts/', function(error){
          if(!error || (error && error.code === 'EEXIST')){
            createSqlScript(request.params.fileName, request.payload, function(err, sqlFileName){
              if(err) throw err;
              reply(sqlFileName);
            });
          }
        });

        function createSqlScript(scriptName, script, callback){
          if(script == null){
            var no_script_error = new Error('Script is null');
            no_script_error.null_script = true;
            return callback(no_script_error, null);
          }
          var options = { encoding: 'windows-1252' };
          var ws = fs.createWriteStream('./scripts/' + scriptName, options);

          ws.write('SPOOL G:\\AGOC-NP\\NP\\Operacao\\logs\\' + script.env+ '\\' +
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
      validate:{
        params: {
          fileName : Joi.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]_.+\.sql$/)
        }
      },
      handler: function(request, reply){
        fs.stat('./scripts/'+ request.params.fileName, function(err, stat) {
          if(err) reply.view('404', {title: 'You found a missing page, but won the 404 error!'}).code(404);
          return reply.file('./scripts/'+ request.params.fileName);
        });
      }
    },

    missing: {
        handler: function(request, reply){
            reply.view('404', {
                title: 'You found a missing page, but won the 404 error!'
            }).code(404);
        }
    }
}

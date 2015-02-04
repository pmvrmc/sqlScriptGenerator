module.exports = function() {

  var ScriptController = {};

  ScriptController.createScript = function(request, reply){
    console.log('cenas');
    fs.mkdir('./scripts/', function(error){
      if(!error || (error && error.code === 'EEXIST')){
        createSqlScript(request.params.fileName, request.payload, function(err, sqlFileName){
          if(err) throw err;
          reply(sqlFileName);
        });
      }
    });
  }

  ScriptController.getScript = function(request, reply){
    fs.stat('./scripts/'+ request.params.fileName, function(err, stat) {
      if(err) reply.view('404', {title: 'You found a missing page, but won the 404 error!'}).code(404);
      return reply.file('./scripts/'+ request.params.fileName);
    });
  }


  ScriptController.createSqlScript = function(scriptName, script, callback){
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

  return ScriptController;

}

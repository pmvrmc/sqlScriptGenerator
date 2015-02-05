'use strict';

sqlScriptGenerator.filter('filt', function(_){

  return function(query, nLines){
    //eliminate empty lines
    var str = query.split('\n');
    str = _.filter(str, function(line){return line.trim().length;});

    if(nLines === 0 ) return str.join('\n\t');

    var result = '';
    var linesToCommit = nLines;

    for(var i = 0; i < str.length; i++){

      //if last char was ';' and we have already passed nLines, COMMIT!
      if( (str[i].indexOf(';', str[i].length - ';'.length) !== -1)
          && (linesToCommit <= 1) ){
        result = result.concat('\n\t' + str[i] + '\n\n\tCOMMIT;\n');
        linesToCommit = nLines;
      }
      else {
        result = result.concat('\n\t' + str[i]);
        --linesToCommit;
      }
    }
    return result;
  }

});

'use strict';

sqlScriptGenerator.filter('addCommitsPreview', function(_){

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
        result = result.concat('\n\t' + str[i].trim() + '\n\n\tCOMMIT;\n');
        linesToCommit = nLines;
      }
      else {
        result = result.concat('\n\t' + str[i].trim());
        --linesToCommit;
      }
    }
    return result;
  }

});

sqlScriptGenerator.filter('addCommits', function(_){

  return function(query, nLines){
    //eliminate empty lines
    var str = query.split('\n');
    str = _.filter(str, function(line){return line.trim().length;});

    if(nLines === 0 ) return str.join('\n');

    var result = '';
    var linesToCommit = nLines;

    for(var i = 0; i < str.length; i++){

      //if last char was ';' and we have already passed nLines, COMMIT!
      if( (str[i].indexOf(';', str[i].length - ';'.length) !== -1)
        && (linesToCommit <= 1) ){
          result = result.concat('\n' + str[i].trim() + '\n\nCOMMIT;\n');
          linesToCommit = nLines;
        }
        else {
          result = result.concat('\n' + str[i].trim());
          --linesToCommit;
        }
      }
      return result;
    }

});

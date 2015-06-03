'use strict';

sqlScriptGenerator.filter('addCommits', function(){

  return function(query, nLines){

    //eliminate empty lines, and trim them
    var str = query.split('\n');

    str = _.map(str, function(line){
      return line.trim();
    });

    str = _.filter(str, function(line){
      return line.length;
    });

    //if no commits, just return
    if(nLines === 0 ){
        return str.join('\n');
    }

    var result = '';
    var linesToCommit = nLines;

    //for each line, see if lines until commit have already passed
    //and if we have a line ending in ;
    _.each(str, function(line){
        if(linesToCommit <= 1 && line.slice(-1) === ';'){
          result = result.concat(line + '\n\nCOMMIT;\n\n');
          linesToCommit = nLines;
        }
        else {
          result = result.concat(line + '\n');
          --linesToCommit;
        }
    });
    return result;
  }

});

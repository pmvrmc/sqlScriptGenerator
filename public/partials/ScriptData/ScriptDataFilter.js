'use strict';

/* Services */

sqlScriptGenerator.filter('filt', function(){

  return function(query, nLines){
    if(nLines === 0 ) return query.split('\n').join('\n\t');

    var str = query.split('\n');
    var result = '';
    var linesToCommit = nLines;

    for(var i = 0; i < str.length; i++){
      //TODO: se chegou a 10 linha verifica sempre se pode inserir o commit
      //se o ultimo char foi ';'

      if( (str[i].indexOf(';', str[i].length - ';'.length) !== -1)
          && (linesToCommit <= 0) ){
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

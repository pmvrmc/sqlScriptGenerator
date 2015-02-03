'use strict';

/* Services */

sqlScriptGenerator.filter('filt', function(){

  return function(query, nLines){
    if(nLines === 0) return query;

    var str = query.split('\n');
    var result = '';

    for(var i = 0; i < str.length; i++){
      //TODO: se chegou a 10 linha verifica sempre se pode inserir o commit
      //se o ultimo char foi ';'
      if( (str[i].indexOf(';', str[i].length - ';'.length) !== -1)
          && (i % nLines === 0)
          && (i !== 0) ){
        result = result.concat('\n\n\tCOMMIT;\n\n\t' + str[i] + '\n');
      }
      result = result.concat('\n\t' + str[i]);
    }
    return result;
  }

});

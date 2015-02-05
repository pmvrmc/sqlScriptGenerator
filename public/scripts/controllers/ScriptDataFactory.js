'use strict';

sqlScriptGenerator.factory('ScriptDataFactory', ['$http', '$filter', function($http, $filter){

  //create the script and afterwards downloads it
  function postScript(script){
    return $http({
      method: 'POST',
      url: '/scripts/' + $filter('date')(script.date, 'yyyyMMdd') + '_' + script.name + '.sql',
      data: {
        name: script.name,
        schema: script.schema,
        env: script.env,
        query: $filter('filt')(script.query, script.commit),
        date: script.date,
        commit: script.commit
      }
    });
  }

  return {
    postScript: postScript
  }

}]);

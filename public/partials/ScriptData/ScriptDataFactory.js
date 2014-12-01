'use strict';

/* Services */

appServices.factory('ScriptDataFactory', ['$http', '$filter', function($http, $filter){

  //create the script and afterwards downloads it
  function postScript(script){
    return $http({
      method: 'POST',
      url: '/scripts/' + $filter('date')(script.date, 'yyyyMMdd') + '_' + script.name + '.sql',
      data: script
    });
  }

  return {
    postScript: postScript
  }

}]);

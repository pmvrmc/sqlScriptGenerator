'use strict';

/* Services */

appServices.factory('ScriptDataFactory', ['$http', '$filter', function($http, $filter){

  //create the script and afterwards downloads it
  function postScript(script){
    return $http({
      method: 'POST',
      url: '/script/' + $filter('date')(script.date, 'yyyyMMdd') + '_' + script.name + '.sql',
      data: script
    }).success(function(){
      window.location = '/script/' + $filter('date')(script.date, 'yyyyMMdd') + '_' + script.name + '.sql';
    });
  }

  return {
    postScript: postScript
  }

}]);

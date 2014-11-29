'use strict';

/* Services */

appServices.factory('ScriptDataFactory', ['$http', '$filter', function($http, $filter){

   function postScript(script){
        return $http({
            method: 'POST',
            url: '/script/' + $filter('date')(script.date, 'yyyyMMdd') + '_' + script.name + '.sql',
            data: script
        });
    }

    return {
      postScript: postScript
    }

}]);

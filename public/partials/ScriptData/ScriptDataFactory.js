'use strict';

/* Services */

appServices.factory('ScriptDataFactory', ['$http', function($http){

   function postScript(script){
        return $http({
            method: 'POST',
            url: '/postScript',
            data: script

        });
    }

    return {
      postScript: postScript
    }

}]);

'use strict';

/* Services */

appServices.factory('ScriptDataFactory', ['$http', function($http){

   function postTax(script){
        return $http({
            method: 'POST',
            url: '/postTax',
            data: script

        });
    }

    return {
        postTax: postTax
    }

}]);

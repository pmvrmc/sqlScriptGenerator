'use strict';


// Declare app level module which depends on filters, and services
var sqlScriptGenerator = angular.module('sqlScriptGenerator', [
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {


  $routeProvider.when('/', {
    redirectTo: '/scripts'
  });

  $routeProvider.when('/scripts', {
    templateUrl: 'partials/ScriptData/scripts.html',
    controller: 'ScriptDataCtrl'
  });

}]);

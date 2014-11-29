'use strict';


// Declare app level module which depends on filters, and services
angular.module('sqlScriptGenerator', [
    'ngRoute',
    'sqlScriptGenerator.filters',
    'sqlScriptGenerator.services',
    'sqlScriptGenerator.directives',
    'sqlScriptGenerator.controllers',
    'ui.utils',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {


  $routeProvider.when('/', {
    redirectTo: '/script'
  });

  $routeProvider.when('/script', {
    templateUrl: 'partials/ScriptData/script.html',
    controller: 'ScriptDataCtrl'
  });

}]);

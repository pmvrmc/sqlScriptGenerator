// Declare app level module which depends on filters, and services
var sqlScriptGenerator = angular.module('sqlScriptGenerator', [
'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '../views/scripts.html',
    controller: 'ScriptDataCtrl'
  });

}]);

'use strict';


// Declare app level module which depends on filters, and services
angular.module('execucaoScipts', [
    'ngRoute',
    'execucaoScipts.filters',
    'execucaoScipts.services',
    'execucaoScipts.directives',
    'execucaoScipts.controllers',
    'ui.utils',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/taxes', {
        templateUrl: 'partials/TaxesData/taxes-panel.html',
        controller: 'TaxesDataCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/taxes'
    });

}]);

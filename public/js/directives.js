'use strict';

/* Directives */

var appDirectives = angular.module('execucaoScipts.directives', []);

appDirectives.directive('taxPessoa', function(){
    return{
        restrict: 'E',
        templateUrl: 'partials/TaxesData/tax-pessoa.html'
    };
});

appDirectives.directive('taxCasa', function(){
    return{
        restrict: 'E',
        templateUrl: 'partials/TaxesData/tax-casa.html'
    };
});

appDirectives.directive('taxCarro', function(){
    return{
        restrict: 'E',
        templateUrl: 'partials/TaxesData/tax-carro.html'
    };
});

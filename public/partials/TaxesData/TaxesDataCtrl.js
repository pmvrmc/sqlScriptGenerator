'use strict';

/* Controllers */

appControllers.controller('TaxesDataCtrl', ['$scope', 'TaxesDataFactory', function($scope, TaxesDataFactory) {

  //the object that will store the form data aka ng-model
  $scope.script = {};

  $scope.script.date = new Date();

	$scope.submitForm = function(isValid, script) {
		// check to make sure the form is completely valid
		if (isValid) {
			TaxesDataFactory.postTax(user).then(function(result){
                alert("Post data: \n" + JSON.stringify(result.data));
            });
		}
		else {
			alert('our form is not amazing');
		}
	};

	$scope.form = [
            {
                'labelFor' : 'name',
                'labelClass' : 'col-md-2 control-label',
                'labelText' : 'Nome',
                'inputType' : 'text',
                'inputId' : 'name',
                'inputName' : 'name',
                'inputPlaceholder' : 'Nome do Script',
                'inputClass' : 'form-control',
                'inputNgModel' : 'name'
            },
            {
                'labelFor' : 'schema',
                'labelClass' : 'col-md-2 control-label',
                'labelText' : 'Schema',
                'inputType' : 'text',
                'inputId' : 'schema',
                'inputName' : 'schema',
                'inputPlaceholder' : 'Schema do Script',
                'inputClass' : 'form-control',
                'inputNgModel' : 'schema'
            },
            {
                'labelFor' : 'objective',
                'labelClass' : 'col-md-2 control-label',
                'labelText' : 'Objectivo',
                'inputType' : 'text',
                'inputId' : 'objective',
                'inputName' : 'obective',
                'inputPlaceholder' : 'Objectivo do Script',
                'inputClass' : 'form-control',
                'inputNgModel' : 'objective'
            },
            {
              'labelFor' : 'target',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Alvo',
              'inputType' : 'text',
              'inputId' : 'target',
              'inputName' : 'target',
              'inputPlaceholder' : 'Alvo do Script',
              'inputClass' : 'form-control',
              'inputNgModel' : 'target'
            },
            {
                'labelFor' : 'procedure',
                'labelClass' : 'col-md-2 control-label',
                'labelText' : 'Procedimento',
                'inputType' : 'text',
                'inputId' : 'procedure',
                'inputName' : 'procedure',
                'inputPlaceholder' : 'Passos de execução do script',
                'inputClass' : 'form-control',
                'inputNgModel' : 'procedure'
            },
            {
              'labelFor' : 'expectedResult',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Resultado Esperado',
              'inputType' : 'text',
              'inputId' : 'expectedResult',
              'inputName' : 'expectedResult',
              'inputPlaceholder' : 'Alterações esperadas na BD',
              'inputClass' : 'form-control',
              'inputNgModel' : 'expectedResult'
            }
        ];

}]);

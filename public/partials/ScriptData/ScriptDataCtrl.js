'use strict';

/* Controllers */

appControllers.controller('ScriptDataCtrl', ['$scope', 'ScriptDataFactory', function($scope, ScriptDataFactory) {

  //the object that will store the form data aka ng-model
  $scope.script = {};

  $scope.script.date = new Date();

	$scope.submitForm = function(isValid, script) {
		// check to make sure the form is completely valid
    if (isValid) {
      ScriptDataFactory.postScript(script);
		}
		else {
			alert('our form is not amazing');
		}
	};

	$scope.form = [
            {
              'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid && !scriptFieldForm.$pristine }',
              'labelFor' : 'name',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Nome',
              'inputType' : 'text',
              'inputId' : 'name',
              'inputName' : 'name',
              'inputRequired' : true,
              'inputPlaceholder' : 'Nome do Script',
              'inputClass' : 'form-control',
              'inputNgModel' : 'name',
              'errorNgShow' : 'scriptFieldForm.$invalid && !scriptFieldForm.$pristine',
              'errorText' : 'Campo obrigatório!'
            },
            {
              'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid && !scriptFieldForm.$pristine }',
              'labelFor' : 'schema',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Schema',
              'inputType' : 'text',
              'inputId' : 'schema',
              'inputName' : 'schema',
              'inputRequired' : true,
              'inputPlaceholder' : 'Schema do Script',
              'inputClass' : 'form-control',
              'inputNgModel' : 'schema',
              'errorNgShow' : 'scriptFieldForm.$invalid && !scriptFieldForm.$pristine',
              'errorText' : 'Campo obrigatório!'
            },
            {
              'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid && !scriptFieldForm.$pristine }',
              'labelFor' : 'objective',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Objectivo',
              'inputType' : 'text',
              'inputId' : 'objective',
              'inputName' : 'obective',
              'inputRequired' : false,
              'inputPlaceholder' : 'Objectivo do Script',
              'inputClass' : 'form-control',
              'inputNgModel' : 'objective'
            },
            {
              'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid && !scriptFieldForm.$pristine }',
              'labelFor' : 'target',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Alvo',
              'inputType' : 'text',
              'inputId' : 'target',
              'inputName' : 'target',
              'inputRequired' : false,
              'inputPlaceholder' : 'Alvo do Script',
              'inputClass' : 'form-control',
              'inputNgModel' : 'target'
            },
            {
              'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid && !scriptFieldForm.$pristine }',
              'labelFor' : 'procedure',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Procedimento',
              'inputType' : 'text',
              'inputId' : 'procedure',
              'inputName' : 'procedure',
              'inputRequired' : false,
              'inputPlaceholder' : 'Passos de execução do script',
              'inputClass' : 'form-control',
              'inputNgModel' : 'procedure'
            },
            {
              'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid && !scriptFieldForm.$pristine }',
              'labelFor' : 'expectedResult',
              'labelClass' : 'col-md-2 control-label',
              'labelText' : 'Resultado Esperado',
              'inputType' : 'text',
              'inputId' : 'expectedResult',
              'inputName' : 'expectedResult',
              'inputRequired' : false,
              'inputPlaceholder' : 'Alterações esperadas na BD',
              'inputClass' : 'form-control',
              'inputNgModel' : 'expectedResult'
            }
        ];

}]);

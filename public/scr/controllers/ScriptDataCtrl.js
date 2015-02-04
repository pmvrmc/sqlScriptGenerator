'use strict';

sqlScriptGenerator.controller('ScriptDataCtrl', ['$scope', '$filter','ScriptDataFactory', function($scope, $filter, ScriptDataFactory) {

  //the object that will store the form data aka ng-model
  $scope.script = {};
  $scope.script.commit = 0;
  $scope.script.query = '';
  $scope.script.date = new Date();

	$scope.submitForm = function(isValid, script) {
		// check to make sure the form is completely valid
    if (isValid) {
      ScriptDataFactory.postScript(script).success(function(){
        window.location = '/scripts/' + $filter('date')(script.date, 'yyyyMMdd') + '_' + script.name + '.sql';
      });
		}
		else {
			alert('Form is not valid!');
		}
	};

  //Form structure
	$scope.form = [
    //Nome Script
    {
      'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid }',
      'labelFor' : 'name',
      'labelClass' : 'control-label',
      'labelText' : 'Nome',
      'inputType' : 'text',
      'inputId' : 'name',
      'inputName' : 'name',
      'inputRequired' : true,
      'inputPlaceholder' : 'Nome do Script',
      'inputClass' : 'form-control',
      'inputNgModel' : 'name',
      'errorNgShow' : 'scriptFieldForm.$invalid',
      'errorText' : 'Campo obrigatório!'
    },
    //Schema Script
    {
      'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid }',
      'labelFor' : 'schema',
      'labelClass' : 'control-label',
      'labelText' : 'Schema',
      'inputType' : 'text',
      'inputId' : 'schema',
      'inputName' : 'schema',
      'inputRequired' : true,
      'inputPlaceholder' : 'Schema do Script',
      'inputClass' : 'form-control',
      'inputNgModel' : 'schema',
      'errorNgShow' : 'scriptFieldForm.$invalid',
      'errorText' : 'Campo obrigatório!'
    },
    //SID Script
    {
      'formGroupNgClass' : '{ "has-error" : scriptFieldForm.$invalid }',
      'labelFor' : 'env',
      'labelClass' : 'control-label',
      'labelText' : 'SID',
      'inputType' : 'text',
      'inputId' : 'env',
      'inputName' : 'env',
      'inputRequired' : true,
      'inputPlaceholder' : 'SID do Script',
      'inputClass' : 'form-control',
      'inputNgModel' : 'env',
      'errorNgShow' : 'scriptFieldForm.$invalid',
      'errorText' : 'Campo obrigatório!'
    }
  ];

}]);

'use strict';

sqlScriptGenerator.controller('ScriptDataCtrl', ['$scope', '$filter', function($scope, $filter) {

    $scope.encodings = ['UTF-8', 'WINDOWS-1252'];
    $scope.lines = [
        { desc: '10 linhas', value: 10 },
        { desc: '50 linhas', value: 50 },
        { desc: '100 linhas', value: 100 },
        { desc: 'Só no fim', value: 0 }
    ];
    $scope.types = ['BD', 'Operação'];

    //the object that will store the form data aka ng-model
    $scope.script = {};
    $scope.script.commit = 0;
    $scope.script.query = '';
    $scope.script.date = new Date();
    $scope.script.encoding = $scope.encodings[1];
    $scope.script.type = $scope.types[1];

	$scope.submitForm = function(isValid, script) {
		// check to make sure the form is completely valid
    if (isValid) {

        var scriptQuery = 'SPOOL ';

        //create and encode the script
        if($scope.script.type === $scope.types[1]){
            scriptQuery = scriptQuery + 'G:\\AGOC-NP\\NP\\Operacao\\logs\\' + $scope.script.env + '\\' +
                $filter('date')($scope.script.date, 'yyyyMMdd') + '\\' + $filter('date')($scope.script.date, 'yyyyMMdd') + '_' +
                $scope.script.name + '.log\n\n';
        } else {
            scriptQuery = scriptQuery + $filter('date')($scope.script.date, 'yyyyMMdd') + '_' + $scope.script.name + '.log\n\n';
        }

        var scriptQuery = scriptQuery + 'SET ECHO ON;\n\nALTER SESSION SET current_schema=' + $scope.script.schema +
            ';\n\nALTER SESSION SET NLS_DATE_FORMAT=\'YYYY-MM-DD HH24:MI:SS\';\n\n' + $filter('addCommits')($scope.script.query, $scope.script.commit) +
            '\n\nCOMMIT;\n\nSET ECHO OFF;\n\nSPOOL OFF';
        scriptQuery = new CustomTextEncoder($scope.script.encoding, { NONSTANDARD_allowLegacyEncoding: true }).encode(scriptQuery);

        //save local file
        var blob = new Blob([scriptQuery], {type: 'text/plain;charset=' + $scope.script.encoding });
        saveAs(blob, $filter('date')($scope.script.date, 'yyyyMMdd') + '_' + $scope.script.name + '.sql');

        }
        else {
        	alert('Form is not valid!');
        }
	};

  //Form structure
	$scope.form = [
    //Nome Script
    {
      'formGroupNgClass' : '{ \'has-error\' : scriptFieldForm.$invalid }',
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
      'formGroupNgClass' : '{\'has-error\' : scriptFieldForm.$invalid }',
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
      'formGroupNgClass' : '{ \'has-error\' : scriptFieldForm.$invalid }',
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

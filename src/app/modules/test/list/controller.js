(function() {
	'use strict'

	angular
		.module('esTester.modules.test')
		.config(config)
		.controller('TestsCtrl', TestsCtrl);

	function config($stateProvider) {
		$stateProvider
			.state('test', {
				url: '/tests/test/:id',
				templateUrl: 'app/modules/test/details/testItem/template.html',
				controller: 'TestCtrl',
				controllerAs: '$ctrl'

			})
		;
	}

	function TestsCtrl(Test) {
		var vm = this;

		vm.testsList = Test.list();
		vm.currentTest = vm.testsList[0];

		vm.setCurrent = setCurrent;
		vm.clearResults = clearResults;

		function setCurrent(test) {
			vm.currentTest = test;
		}

		function clearResults() {
			vm.currentTest.isPassed = false;
			vm.currentTest.correctAnswers = 0;
			vm.currentTest.questions.forEach(function(item, index, test) {
				item.isAnswered = false;
				item.isCorrect = false;
			});
		}
	}

})();

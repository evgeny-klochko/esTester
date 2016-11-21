(function() {
	'use strict'

	angular
		.module('esTester.modules')
		.factory('Questions', Questions);

	function Questions(Test) {
		var testsList = Test.list();

		var service = {
			getAnswer: getAnswer
		};

		return service;

		function getAnswer(test, question) {
			var test = getTest(test);
			return test.questions[question].answer;
		}

		function getTest(test) {
			return Test.find(test.id);
		}

	}

})();
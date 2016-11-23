(function() {
	'use strict'

	angular
		.module('esTester.modules')
		.factory('CurrentTest', CurrentTest);

	function CurrentTest(Test) {
		var vm = this;
		console.log('again here');

		var currentTest = Test.list()[0];

		var service = {
			get: get,
			set: set,
			reset: reset,
			isCurrent: isCurrent
		};

		return service;

		function get() {
			return currentTest;
		}

		function set(test) {
			currentTest = test;
		}

		function reset() {
			console.log('reseting');
			currentTest.isPassed = false;
			currentTest.correctAnswers = 0;
			currentTest.questions.forEach(function(item, index, test) {
				item.isAnswered = false;
				item.isCorrect = false;
			});
		}

		function isCurrent(test) {
			return test.id == currentTest.id ? true : false;
		}

	}

})();
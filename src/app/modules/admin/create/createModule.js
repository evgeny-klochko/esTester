(function() {
	'use strict';
	angular.module('esTester.modules.admin.create', [

	])
	.controller('CreateController', CreateController);

	function CreateController($localStorage, $state) {
		var self = this;

		if(!($localStorage.allTests)) {
			$localStorage.allTests = [];
		} else {
			self.tests = $localStorage.allTests;
		}

		self.currentTest = 0;
		self.test = {};
		self.test.questions = [{}];
		self.test.questions[0].variants = ['',''];

		self.addTest = function(test) {
			self.tests.push(test);
			self.test = {};
			self.test.questions = [{}];
			self.test.questions[0].variants = ['',''];
		}

		self.addVariant = function(quest) {
			self.test.questions[quest].variants.push('');

		}

		self.addQuestion = function() {
			self.test.questions.push({
				variants: ['','']
			});
		}

		self.setCurrentTest = function(currentTest) {
			self.currentTest = currentTest;
		}

	}
})();

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
		self.deleteVariant = function(quest) {
			var variants = self.test.questions[quest].variants;
			variants.splice(variants.length - 1, 1);
		}

		self.addQuestion = function() {
			self.test.questions.push({
				variants: ['','']
			});
		}

		self.deleteQuestion = function(quest) {
			var questions = self.test.questions;
			console.log(questions);
			questions.splice(quest, 1);
		}

		self.setCurrentTest = function(currentTest) {
			self.currentTest = currentTest;
		}

	}
})();

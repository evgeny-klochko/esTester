(function() {
"use strict"

angular.module('esTester.modules.tests', [

	])

	.controller('TestsController', TestsController);

	function TestsController($localStorage, currentUser) {

		var self = this;

		self.testsList = {};
		self.currentTest = 0;
		self.currentUser = currentUser.getCurrentUsert;
		self.isPassing = false;
		self.user = currentUser.getCurrentUser();
		self.testsList = $localStorage.allTests;


		self.toPassing = function() {
			self.isPassing = !self.isPassing;
		}

		self.clearResults = function() {
			for(var testIndex in self.testsList) {
				for(var questIndex in self.testsList[testIndex].questions) {
					self.testsList[testIndex].questions[questIndex].isAnswered = false;
					self.testsList[testIndex].questions[questIndex].isCorrect = false;
					self.testsList[testIndex].correctAnswers = 0;
				}
			}
		}


		self.setCurrentTest = function(value) {
			self.currentTest = value;
			var user = currentUser.getCurrentUser();
			user.testsPassed = 1;
			currentUser.setCurrentUser(user);
		}

		self.getCurrentTestLength = function() {
			return self.testsList[self.currentTest].questions.length;
		}

		self.check = function(value, quest){
			var currentQuestion = self.testsList[self.currentTest].questions[quest];
		currentQuestion.isAnswered = true;


			if(value === (currentQuestion.answer - 1)) {
				currentQuestion.isCorrect = true;
			}

			//TODO: push test in user object
		}

	}

})();


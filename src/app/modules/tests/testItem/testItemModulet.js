(function() {
'use strict'

	angular.module('esTester.modules.tests.testItem', [

	])
	.controller('TestItemController', TestItemController);

	function TestItemController($localStorage, $stateParams, $state, currentUser, currentTest) {
		console.log('newTEstItem');

		var self = this;
		var  numberOfAnswers = 0;
		self.currentTest = $stateParams.testId;
		self.testsList = JSON.parse(JSON.stringify($localStorage.allTests));
		self.currentUser = currentUser.getCurrentUser();
		self.testInProgress = currentTest.getCurrentTest();

		self.checkAnswer = function(indexQuest, indexVar) {
			console.log('checking');

			var correctAnswer = +getAnswer(indexQuest);
			var userAnswer = indexVar + 1;

			if(correctAnswer === userAnswer) {
				self.testInProgress.correctAnswers++;
				self.testInProgress.questions[indexQuest].isCorrect = true;
			} else {

			}
			self.testInProgress.questions[indexQuest].isAnswered = true;
			numberOfAnswers++;
		}

		function getAnswer(indexQuest) {

			return self.testInProgress.questions[indexQuest].answer;
		}


		self.submitTest = function(answer) {

			if(numberOfAnswers === self.testInProgress.questions.length) {

				if(!(isContainTest(self.testInProgress))) {
					self.currentUser.testsPassed.push(self.testInProgress);
					$state.go('tests');
				}
			} else {
				console.log('otvatte na vse voprosy');
			}
		}

		function isContainTest(test) {
			for(var testItem in self.currentUser.testsPassed) {

				if(self.currentUser.testsPassed[testItem].name === test.name) {
					return {
						isContain: true,
						test: testItem
					}
				}
			}
		}



		self.closeTest = function() {
			$state.go('tests');
		}


		function getUserByLogin(login) {
			for(var user in $localStorage.users) {
				if(login === $localStorage.users[user].login) {
					return user;
				}
			}
		}
	}
})();



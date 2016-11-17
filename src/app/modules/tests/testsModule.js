(function() {
"use strict"

angular.module('esTester.modules.tests', [
	'esTester.modules.tests.testItem'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('test', {
				url: '/tests/:testId',
				templateUrl: 'app/modules/tests/testItem/testItem.html',
				controller: 'TestItemController',
				controllerAs: 'TestItemCtrl'
			})
		;
	})
	.controller('TestsController', TestsController);

	function TestsController($localStorage, currentUser, $state, currentTest) {

		var self = this;

		self.testsList = {};
		self.testsList = $localStorage.allTests;
		self.currentTest = 0;
		self.currentUser = currentUser.getCurrentUser();
		self.isPassed = false;

		self.result = 0;



		//
		//it depends on from which place test is taken (testsList or user.passedTests)
		//
		setCurrentTestOnCondition();

		self.isCurrentTest = function(index) {

			if(self.currentTest === index) {
				return true;
			}
		}

		self.getCurrentTestResult = function() {
			return self.currentUser.testsPassed[self.currentTest].correctAnswers;
		}

		self.goToTest = function(testId) {
			$state.go('test', {testId: self.currentTest});
		}

		self.clearResults = function() {
			console.log('clearing');

			if(self.currentUser.testsPassed.length) {
				var is = isContainTest(self.testsList[self.currentTest]);
				self.currentUser.testsPassed.splice(is.test, 1);
				setCurrentTestOnCondition();
				self.isPassed = false;
			}

		}

		self.setCurrentTest = function(value) {

			self.currentTest = value;
			setCurrentTestOnCondition();

		}


		function setCurrentTestOnCondition() {
			var is = isContainTest(self.testsList[self.currentTest]);

			if(is) {

				self.isPassed = true;
				currentTest.setCurrentTest(self.currentUser.testsPassed[is.test]);

				self.result = currentTest.getCurrentTest().correctAnswers + 
					'/' + currentTest.getCurrentTest().questions.length;

			} else {

				self.isPassed = false;
				currentTest.setCurrentTest(JSON.parse(JSON.stringify(self.testsList[self.currentTest])));
				self.result = 'не определен';

			}

		}

		function isPassed(user) {

			if(user.testsPassed) {
				for(var test in user.testsPassed){

					if(self.testsList[self.currentTest].name === user.testsPassed[test].name) {
						return true;
					} else {
						//TODO: for some features
					}
				}
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

	}

})();
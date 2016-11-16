(function() {
"use strict"

angular.module('esTester.modules.admin', [

	'esTester.modules.admin.create',
	'esTester.modules.admin.edit'
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('create', {
				url: '/admin/create',
				templateUrl: 'app/modules/admin/create/create.html',
				controller: 'CreateController',
				controllerAs: 'CreateCtrl'

			})
			.state('edit', {
				url: '/admin/edit/:quest',
				templateUrl: 'app/modules/admin/edit/edit.html',
				controller: 'EditController',
  				controllerAs: 'EditCtrl'
			})
		;
	})
	.controller('AdminController', AdminController);

	function AdminController($localStorage, $state) {

		var self = this;

		self.$storage = $localStorage;
		self.currentTest = 0;
		self.test = {};
		self.users = self.$storage.users;


		if(!($localStorage.allTests)) {
			$localStorage.allTests = [];
		} else {
			self.tests = $localStorage.allTests;
		}

		self.deleteUser = function(userIndex) {
			self.users.splice(userIndex, 1);
		}

		self.setCurrentTest = function(currentTest) {
			self.currentTest = currentTest;
		}

		self.isCurrent = function(testIndex){
			return testIndex === self.currentTest ? true : false
		}

		self.addTest = function(test) {
			self.$storage.tests.push(test);
		}

		self.editTest = function(testName) {

			$state.go('edit', {quest: self.currentTest});
		}

		self.deleteTest = function(testIndex) {
			self.$storage.allTests.splice(testIndex, 1);
		}

		self.showQuestions = function() {
			self.tests[self.currentTest].questions.qVisibility = 
			  !self.tests[self.currentTest].questions.qVisibility;
		}

	}

})();



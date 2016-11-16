(function() {
"use strict"

angular.module('esTester.modules', [
	'esTester.modules.admin',
	'esTester.modules.tests',
	'esTester.modules.user'
	])
	
	.service('currentUser', function() {
		var currentUser = {
			login: 'guest',
			testsPassed: []
		};

		this.setCurrentUser = function(user) {
			var currentUser = user;
		}
		this.getCurrentUser = function() {
			return currentUser;
		}
		this.setValue = function(key ,value) {
			currentUser[key] = value;
		}
	})
;

})();
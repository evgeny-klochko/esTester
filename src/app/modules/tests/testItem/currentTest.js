(function() {
	"use strict"

	angular.module('esTester.modules.tests')
		.service('currentTest', function() {

			var currentTest = {

			};


			this.setCurrentTest = function(test) {
					currentTest = test;
			}
			this.getCurrentTest = function() {

				return currentTest;
			}

	})
})();
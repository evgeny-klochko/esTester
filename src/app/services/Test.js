(function() {
	'use strict'

	angular
		.module('esTester.modules')
		.factory('Test', Test);

		function Test($localStorage) {

			var test = {};


			if(!$localStorage.tests) {
				$localStorage.tests = [];
			}

			var tests = $localStorage.tests;


			var service = {
				add: add,
				list: list,
				find: find,
				remove: remove,
				getIndex: getIndex,
				replace: replace

			};

			return service;

			function add(test) {
				var id = (tests.length > 0) ? (+(tests[tests.length - 1].id) + 1) : 0;
				var test = angular.copy(test);
				test.id = id;
				tests.push(test);
			}

			function remove(index) {
				tests.splice(index, 1);
			}

			function getIndex(id) {

				for(var i = 0; i < tests.length; i++) {
					if(tests[i].id == id) return i;
				}
			}

			function replace(test, index) {
				delete tests[index];
				tests[index] = angular.copy(test);
			}

			function find(id) {
				var test = tests.filter(function (test) {
					if(test.id == id) return test;
				});

				return test && test[0] || null;
			}

			function list() {
				return tests;
			}

			function getResult() {
				
			}


		}
	}
)();
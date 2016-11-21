(function() {

	'use strict';

	angular
		.module('esTester', [
			'ui.router',
			'esTester.modules',
			'esTester.directives',
			'ngStorage'
		])
		.run(run)

	function run() {

	}

})();

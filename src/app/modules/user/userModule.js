(function() {
'use strict'

	angular.module('esTester.modules.user', [

	])
	.controller('UserController', UserController);

	function UserController($localStorage, currentUser) {

		console.log('begin');
		this.currentUser = currentUser.getCurrentUser();
		console.log('end');
		console.log('wea re in user');
		console.log(this.currentUser);

	}
})();
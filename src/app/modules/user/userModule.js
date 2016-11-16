(function() {
'use strict'

	angular.module('esTester.modules.user', [

	])
	.controller('UserController', UserController);

	function UserController($localStorage, currentUser) {

		this.ok = 'ok';
		this.currentUser = currentUser.getCurrentUser();

	}
})();
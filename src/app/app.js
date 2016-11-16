(function() {

'use strict';

angular.module('esTester', [
		'ui.router',
		'esTester.modules',
		'esTester.directives',
		'ngStorage'
])
.controller('MainController', MainController);

	function MainController($localStorage, $state, currentUser) {

		var self = this;

		self.isAdmin = false;
		self.currentUser = currentUser.getCurrentUser();
		self.status = true;

		if(!$localStorage.users) $localStorage.users = [];

		if((self.currentUser.login !== 'guest')) {

			self.status = true;
		} else {

			self.status = false;
		}

		//
		//TOFIX: function should be easier
		this.setLogin = function(login) {

		if(login === 'admin') {
			self.isAdmin = true;
		}

		self.currentUser.login = login;
		currentUser.setCurrentUser(self.currentUser);

		if( !(isUserExist(login)) ) {
			console.log('new user');
				$localStorage.users.push(self.currentUser);
		}
		else {
			console.log('old user');
			currentUser.setCurrentUser(getUserByLogin(login));
		}
		$state.go('tests');

		}

		//
		//NEED FIX DUPLICATES
		function isUserExist(login) {
		for(var user in $localStorage.users) {
			if(login === $localStorage.users[user].login) {
				console.log('exist');
				return true;
			}
		}
		}
		function getUserByLogin(login) {
		for(var user in $localStorage.users) {
			if(login === $localStorage.users[user].login) {
				return $localStorage.users[user];
			}
		}
		return {login: login}
		}
		//
		//
	}

})();


(function() {


angular.module('esTester')

	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('tests', {
				url: '/tests',
				templateUrl: 'app/modules/tests/tests.html',
				controller: 'TestsController',
				controllerAs: 'TestsCtrl'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/modules/admin/admin.html',
				controller: 'AdminController',
				controllerAs: 'AdminCtrl'
			})
			.state('user', {
				url: '/profile',
				templateUrl: 'app/modules/user/user.html',
				controller: 'UserController',
				controllerAs: 'UserCtrl'
			})
		;
	});
})();




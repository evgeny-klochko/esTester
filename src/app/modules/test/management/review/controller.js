(function() {
	'use strict'

	angular
		.module('esTester.modules.test.management')
		.config(function($stateProvider) {
			$stateProvider
				.state('add', {
					url: '/admin/add',
					templateUrl: 'app/modules/test/management/add/template.html',
					controller: 'AddCtrl',
					controllerAs: '$ctrl'

				})
				.state('edit', {
					url: '/admin/edit/:id',
					templateUrl: 'app/modules/test/management/edit/template.html',
					controller: 'EditCtrl',
  					controllerAs: '$ctrl'
				})
			;
		})
		.controller('AdminCtrl', AdminCtrl);

		function AdminCtrl(Test, $state) {
			var vm = this;

			vm.testsList = Test.list();
			vm.currentTest = vm.testsList[0];
			vm.isHided = true;

			vm.setCurrent = setCurrent;
			vm.deleteTest = deleteTest;
			vm.switcherShowHide = switcherShowHide;

			function setCurrent(test) {
				vm.currentTest = test;
			}

			function deleteTest() {
				var id = vm.currentTest.id;
				Test.remove(Test.getIndex(id));
				$state.go('admin');
			}

			function switcherShowHide() {
				vm.isHided = !vm.isHided;
			}

		}

})();



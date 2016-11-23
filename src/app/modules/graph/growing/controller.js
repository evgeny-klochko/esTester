(function() {
	'use strict'

	angular
		.module('esTester.modules.graph')
		.controller('GraphGrowingCtrl', GraphGrowingCtrl);

	function GraphGrowingCtrl(DatePassing) {
		var vm = this;

		var activeTab = 2;

		vm.dates = DatePassing.list();
		vm.toGraphDotted = DatePassing.getGrowing();

		vm.isActive = isActive;
		vm.setActive = setActive;


		function isActive(value) {
			if(value == activeTab) return true;
		}

		function setActive(value) {
			activeTab = value;
		}
	}
})();

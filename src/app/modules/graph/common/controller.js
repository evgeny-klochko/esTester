(function() {
	'use strict'

	angular
		.module('esTester.modules.graph')
		.controller('GraphCtrl', GraphCtrl);

	function GraphCtrl(DatePassing) {
		var vm = this;

		var activeTab = 1;

		vm.dates = DatePassing.list();

		vm.toGraphDays = DatePassing.getDays();
		vm.toGraphHours = DatePassing.getHours();

/*
		vm.toGraphDays = getTest();
		vm.toGraphHours = getTest();*/

		vm.isActive = isActive;
		vm.setActive = setActive;



		function isActive(value) {
			if(value == activeTab) return true;
		}

		function setActive(value) {
			activeTab = value;
		}

		function getTest() {
			return 	vm.growingGraph = [
		{
			timeItem: '1',
			value: '2'
		},
		{
			timeItem: '2',
			value: '12'
		},
		{
			timeItem: '3',
			value: '20'
		},
		{
			timeItem: '4',
			value: '25'
		},
		{
			timeItem: '5',
			value: '25'
		},
		{
			timeItem: '6',
			value: '25'
		},
		{
			timeItem: '7',
			value: '25'
		},
		{
			timeItem: '8',
			value: '25'
		},
		{
			timeItem: '9',
			value: '25'
		},
		{
			timeItem: '25',
			value: '25'
		},
		{
			timeItem: '10',
			value: '25'
		},
		{
			timeItem: '11',
			value: '25'
		},
		{
			timeItem: '12',
			value: '25'
		},
		{
			timeItem: '13',
			value: '25'
		},
		{
			timeItem: '14',
			value: '25'
		},
		{
			timeItem: '15',
			value: '25'
		},
		{
			timeItem: '16',
			value: '25'
		},
		{
			timeItem: '17',
			value: '25'
		},
		{
			timeItem: '18',
			value: '25'
		},
		{
			timeItem: '19',
			value: '25'
		},
		{
			timeItem: '20',
			value: '25'
		},
		{
			timeItem: '21',
			value: '25'
		},
		{
			timeItem: '22',
			value: '44'
		},
		{
			timeItem: '23',
			value: '17'
		},
		{
			timeItem: '24',
			value: '25'
		},
		{
			timeItem: '25',
			value: '25'
		},
		{
			timeItem: '26',
			value: '25'
		},
		{
			timeItem: '27',
			value: '24'
		},
		{
			timeItem: '28',
			value: '23'
		},
		{
			timeItem: '29',
			value: '22'
		},
		{
			timeItem: '30',
			value: '25'
		},
		{
			timeItem: '31',
			value: '14'
		}

	]
		}
	//ИСПОЛЬЗОВАТЬ КАНВАС, для линейного графика
	//перенести большую часть логики в сервис

	}
})();

(function() {
	'use strict'

	angular
		.module('esTester.modules')
		.factory('DatePassing', DatePassing);

	function DatePassing($localStorage) {

		if(!$localStorage.date) {
			$localStorage.date = [];
		}

		var dates = $localStorage.date;

		var service = {
			list: list,
			add: add,
			getDays: getDays,
			getHours: getHours,
			getDayOfWeek: getDayOfWeek,
			getGrowing: getGrowing
		};

		return service;

		function list() {
			return dates;
		}

		function add(date) {
			dates.push(date);
		}

		function getDays() {
			return countGraphInfo(prepareDays(), 31);
		}

		function getHours() {
			return countGraphInfo(prepareHours(), 24);
		}

		function getDayOfWeek() {
			return countGraphInfo(prepareDayOfWeek(), 7);
		}

		function getGrowing() {
			return countGrowingInfo(prepareFullDate());
		}

		function prepareDays() {
			var prepared = [];

			dates.forEach(function(item, index, arr) {
				var date = (new Date(item)).getDate();
				prepared.push(date);
			});

			return prepared;
		}

		function prepareHours() {
			var prepared = [];

			dates.forEach(function(item, index, arr) {
				var date = (new Date(item)).getHours();
				prepared.push(date);
			});

			return prepared;
		}

		function prepareDayOfWeek() {
			var prepared = [];

			dates.forEach(function(item, index, arr) {
				var date = (new Date(item)).getDay();
				prepared.push(date);
			});

			return prepared;
		}

		function prepareFullDate() {
			var prepared = [];

			dates.forEach(function(item, index, arr) {
				var year = (new Date(item).getFullYear());
				var month = (new Date(item).getMonth());
				var day = (new Date(item).getDate());
				var date = '' + day + '.' + month + '.'  + year;
				prepared.push(date);
			});

			return prepared;
		}

		function countGrowingInfo(info) {
			var toGraph = [];
			var item = {
				timeItem: '',
				value: 0
			}

			var tmpValue = 0;
			for(var i = 0; i < info.length; i++) {
				if(info[i] == info[i + 1]) {
					item.timeItem = info[i];
					item.value++;
				} else {
					item.value++;
					toGraph.push(item);
					tmpValue = item.value;
					item = {};
					item.timeItem = info[i + 1];
					item.value = tmpValue;
				}
			}
			return toGraph;
		}



		function countGraphInfo(info, length) {
			var toGraph = [];

			fillNullPositions(toGraph, length);
			var preparedInfo = info;

			if(length >= preparedInfo.length) {
				var arrLength = length;
			} else {
				var arrLength = preparedInfo.length;
			}

			preparedInfo.sort(compareNumeric);

			for(var i = 0; i < arrLength; i++) {
				if(preparedInfo[i]) {
					toGraph[preparedInfo[i] - 1].value++;
				}
			}
			return toGraph;
		}

		function compareNumeric(a, b) {
			return a - b;
		}

		function fillNullPositions(array, length) {
			for(var i = 0; i < length; i++) {
				if(!array[i]) {
					array[i] = {value: 0, timeItem: i + 1}
				}
			}
		}

	}

})();
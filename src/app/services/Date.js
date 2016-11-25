(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .factory('DatePassing', DatePassing);

  function DatePassing($localStorage) {
    var dates;
    var service;

    if (!$localStorage.date) {
      $localStorage.date = [];
    }

    dates = $localStorage.date;

    service = {
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
      var prepared = {};
      var digitDaysOfWeek = countGraphInfo(prepareDayOfWeek(), 7);

      var week = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье'
      };

      prepared = digitDaysOfWeek.filter(function (item) {
        item.timeItem = week[item.timeItem];
        return item.timeItem;
      });
      return prepared;
    }

    function getGrowing() {
      return countGrowingInfo(prepareFullDate());
    }

    function prepareDays() {
      var prepared = [];

      dates.forEach(function (item) {
        var date = (new Date(item)).getDate();
        prepared.push(date);
      });

      return prepared;
    }

    function prepareHours() {
      var prepared = [];

      dates.forEach(function (item) {
        var date = (new Date(item)).getHours();
        prepared.push(date);
      });

      return prepared;
    }

    function prepareDayOfWeek() {
      var prepared = [];

      dates.forEach(function (item) {
        var date = (new Date(item)).getDay();
        prepared.push(date);
      });

      return prepared;
    }

    function prepareFullDate() {
      var prepared = [];

      dates.forEach(function (item) {
        var year = (new Date(item).getFullYear());
        var month = (new Date(item).getMonth());
        var day = (new Date(item).getDate());
        var date = '' + day + '.' + month + '.' + year;
        prepared.push(date);
      });

      return prepared;
    }

    function countGrowingInfo(info) {
      var toGraph = [];
      var tmpValue = 0;
      var i;

      var item = {
        timeItem: '',
        value: 0
      };

      for (i = 0; i < info.length; i += 1) {
        if (info[i] === info[i + 1]) {
          item.timeItem = info[i];
          item.value += 1;
        } else {
          item.value += 1;
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
      var arrLength;
      var preparedInfo = info;
      var i;

      fillNullPositions(toGraph, length);

      if (length >= preparedInfo.length) {
        arrLength = length;
      } else {
        arrLength = preparedInfo.length;
      }

      preparedInfo.sort(compareNumeric);

      for (i = 0; i < arrLength; i += 1) {
        if (preparedInfo[i]) {
          toGraph[preparedInfo[i] - 1].value += 1;
        }
      }
      return toGraph;
    }

    function compareNumeric(a, b) {
      return a - b;
    }

    function fillNullPositions(array, length) {
      var i;
      for (i = 0; i < length; i += 1) {
        if (!array[i]) {
          array[i] = { value: 0, timeItem: i + 1 };
        }
      }
    }
  }
}());

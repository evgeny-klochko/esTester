(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .factory('Test', Test);

  function Test($localStorage) {
    var tests;
    var service;

    if (!$localStorage.tests) {
      $localStorage.tests = [];
    }

    tests = $localStorage.tests;

    service = {
      add: add,
      list: list,
      find: find,
      remove: remove,
      getIndex: getIndex,
      replace: replace
    };

    return service;

    function add(test) {
      var id = (tests.length > 0) ? (+(tests[tests.length - 1].id) + 1) : 0;
      var currentTest = angular.copy(test);
      currentTest.id = id;
      tests.push(currentTest);
    }

    function remove(index) {
      tests.splice(index, 1);
    }

    function getIndex(id) {
      var i;
      for (i = 0; i < tests.length; i += 1) {
        if (+tests[i].id === +id) return i;
      }
      return null;
    }

    function replace(test, index) {
      delete tests[index];
      tests[index] = angular.copy(test);
    }

    function find(id) {
      var test = tests.filter(function (item) {
        if (+item.id === +id) return item;
        return null;
      });
      return (test && test[0]) || (null);
    }

    function list() {
      return tests;
    }
  }
}());

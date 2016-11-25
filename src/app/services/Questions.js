(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .factory('Questions', Questions);

  function Questions(Test) {
    var service = {
      getAnswer: getAnswer
    };

    return service;

    function getAnswer(test, question) {
      var testCurrent = getTest(test);
      return testCurrent.questions[question].answer;
    }

    function getTest(test) {
      return Test.find(test.id);
    }
  }
}());

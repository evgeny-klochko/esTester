(function () {
  'use strict';

  angular.module('esTester.modules.test.details', [])
  .controller('TestCtrl', TestCtrl);

  function TestCtrl(Test, $stateParams, $state, Questions, DatePassing) {
    var vm = this;

    var id = $stateParams.id;
    var answers = 0;
    var correctAnswers = 0;

    vm.testsList = Test.list();
    vm.currentTest = Test.find(id);
    vm.testProgress = angular.copy(vm.currentTest);

    vm.closeTest = closeTest;
    vm.checkAnswer = checkAnswer;
    vm.submitTest = submitTest;

    function closeTest() {
      $state.go('tests');
    }

    function checkAnswer(indexQuestion, indexVariant) {
      answers += 1;
      vm.testProgress.questions[indexQuestion].isAnswered = true;

      if (+getAnswer(indexQuestion) === (indexVariant + 1)) {
        vm.testProgress.questions[indexQuestion].isCorrect = true;
        correctAnswers += 1;
      } else {
        vm.testProgress.questions[indexQuestion].isCorrect = false;
      }
    }

    function getAnswer(question) {
      return Questions.getAnswer(vm.currentTest, question);
    }

    function submitTest() {
      if (answers === vm.testProgress.questions.length) {
        vm.testProgress.isPassed = true;
        vm.testProgress.correctAnswers = correctAnswers;
        vm.testProgress.date = new Date();
        DatePassing.add(new Date());
        Test.replace(vm.testProgress, Test.getIndex(id));
        $state.go('tests');
      } else {
        alert('Нужно ответить на все вопросы');
      }
    }
  }
}());

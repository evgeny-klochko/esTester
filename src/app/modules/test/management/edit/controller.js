(function () {
  'use strict';

  angular
    .module('esTester.modules.test.management')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl($stateParams, Test, $state) {
    var vm = this;

    vm.id = $stateParams.id;
    vm.testsList = Test.list();
    vm.test = angular.copy(Test.find(vm.id));

    if (!vm.test) {
      $state.go('admin');
    }

    vm.addVariant = addVariant;
    vm.addQuestion = addQuestion;
    vm.saveEditTest = saveEditTest;


    function addVariant(questionIndex) {
      vm.test.questions[questionIndex].variants.push('');
    }

    function addQuestion() {
      vm.test.questions.push({
        variants: ['', '']
      });
    }

    function saveEditTest(test) {
      var gg = Test.getIndex(test.id);
      Test.replace(test, gg);
      $state.go('admin');
    }
  }
}());

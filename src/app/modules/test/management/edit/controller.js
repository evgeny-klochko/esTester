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
    vm.modalShown = true;

    if (!vm.test) {
      $state.go('admin');
    }

    vm.toggleModal = toggleModal;
    vm.addVariant = addVariant;
    vm.deleteVariant = deleteVariant;
    vm.addQuestion = addQuestion;
    vm.deleteQuestion = deleteQuestion;
    vm.saveEditTest = saveEditTest;

    function toggleModal() {
      vm.modalShown = !vm.modalShown;
    }


    function addVariant(questionIndex) {
      vm.test.questions[questionIndex].variants.push('');
    }

    function deleteVariant(quest) {
      var variants = vm.test.questions[quest].variants;
      variants.splice(variants.length - 1, 1);
    }

    function addQuestion() {
      vm.test.questions.push({
        variants: ['', '']
      });
    }

    function deleteQuestion(quest) {
      vm.test.questions.splice(quest, 1);
    }

    function saveEditTest(test) {
      var gg = Test.getIndex(test.id);
      Test.replace(test, gg);
      $state.go('admin');
    }
  }
}());

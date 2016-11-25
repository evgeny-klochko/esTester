(function () {
  'use strict';

  angular
    .module('esTester.modules.test.management')
    .controller('AddCtrl', AddCtrl);

  function AddCtrl(Test, $state) {
    var vm = this;

    vm.testsList = Test.list();

    vm.test = {
      title: '',
      questions: [
        {
          question: '',
          variants: ['', ''],
          answer: ''
        }
      ]
    };

    vm.create = create;
    vm.addQuestion = addQuestion;
    vm.deleteQuestion = deleteQuestion;
    vm.addVariant = addVariant;
    vm.deleteVariant = deleteVariant;

    function reset() {
      vm.test = {};
      vm.test.questions = [{}];
      vm.test.questions[0].variants = ['', ''];
    }

    function create() {
      Test.add(vm.test);
      reset();
      $state.go('admin');
    }

    function addQuestion() {
      vm.test.questions.push({
        variants: ['', '']
      });
    }

    function deleteQuestion(quest) {
      vm.test.questions.splice(quest, 1);
    }

    function addVariant(quest) {
      vm.test.questions[quest].variants.push('');
    }

    function deleteVariant(quest) {
      var variants = vm.test.questions[quest].variants;
      variants.splice(variants.length - 1, 1);
    }
  }
}());

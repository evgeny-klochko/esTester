(function () {
  'use strict';

  angular
    .module('esTester.modules.test.management')
    .config(function ($stateProvider) {
      $stateProvider
        .state('add', {
          url: '/admin/add',
          data: {
            noLogin: false
          },
          views: {
            '': {
              templateUrl: 'app/modules/test/management/add/template.html',
              controller: 'AddCtrl',
              controllerAs: '$ctrl'
            }
          }
        })
        .state('edit', {
          url: '/admin/edit/:id',
          data: {
            noLogin: false
          },
          views: {
            '': {
              templateUrl: 'app/modules/test/management/edit/template.html',
              controller: 'EditCtrl',
              controllerAs: '$ctrl'
            }
          }
        })
        .state('color', {
          url: '/admin/color-settings',
          data: {
            noLogin: false
          },
          views: {
            '': {
              templateUrl: 'app/modules/graph/graph-settings/template.html',
              controller: 'GraphSettingsCtrl',
              controllerAs: '$ctrl'
            }
          }
        })
      ;
    })
    .controller('AdminCtrl', AdminCtrl);

  function AdminCtrl(Test, $state) {
    var vm = this;

    vm.testsList = Test.list();
    vm.currentTest = vm.testsList[0];
    vm.isHided = true;
    vm.modalShown = false;

    vm.toggleModal = toggleModal;
    vm.setCurrent = setCurrent;
    vm.deleteTest = deleteTest;
    vm.switcherShowHide = switcherShowHide;

    function toggleModal() {
      vm.modalShown = !vm.modalShown;
    }

    function setCurrent(test) {
      vm.currentTest = test;
    }

    function deleteTest() {
      var id = vm.currentTest.id;
      Test.remove(Test.getIndex(id));
      $state.go('admin');
    }

    function switcherShowHide() {
      vm.isHided = !vm.isHided;
    }
  }
}());

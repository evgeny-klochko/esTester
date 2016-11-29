(function () {
  'use strict';

  angular
    .module('esTester.modules.graph')
    .controller('GraphSettingsCtrl', GraphSettingsCtrl);

  function GraphSettingsCtrl($scope, $stateParams, Test, Color) {
    var vm = this;

    vm.testsList = Test.list();
    vm.colorsList = Color.list();
    vm.gistogramColors = Color.getGistogram();
    vm.dottedColor = Color.getDotted();
    vm.diagramColor = Color.getDiagram();
    vm.linedColor = Color.getLined();

    vm.modalShown = false;
    vm.toggleModal = function () {
      vm.modalShown = !vm.modalShown;
    };

    vm.reset = function () {
      Color.reset();
    };
  }
}());

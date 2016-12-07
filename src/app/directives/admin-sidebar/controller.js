(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .controller('AdminSideBarCtrl', AdminSideBarCtrl);

  function AdminSideBarCtrl() {
    var vm = this;
    vm.showMenu = false;
    vm.currentTest = 0;

    vm.search = {
      name: '',
      notPassed: false,
      long: false
    };

    vm.isCurrent = isCurrent;
    vm.setCurrent = setCurrent;
    vm.toggleSide = toggleSide;

    function toggleSide() {
      vm.showMenu = !vm.showMenu;
    }

    function isCurrent(index) {
      if (index === vm.currentTest) {
        return true;
      }
      return null;
    }

    function setCurrent(index) {
      vm.currentTest = index;
    }
  }
}());

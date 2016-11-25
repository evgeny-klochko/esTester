(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .controller('SideBarCtrl', SideBarCtrl);

  function SideBarCtrl() {
    var vm = this;
    vm.currentTest = 0;

    vm.search = {
      name: '',
      notPassed: false,
      long: false
    };

    vm.isCurrent = isCurrent;
    vm.setCurrent = setCurrent;

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

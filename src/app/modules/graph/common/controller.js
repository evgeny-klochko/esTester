(function () {
  'use strict';

  angular
    .module('esTester.modules.graph')
    .controller('GraphCtrl', GraphCtrl);

  function GraphCtrl(DatePassing) {
    var vm = this;

    var activeTab = 1;
    vm.showMenu = false;

    vm.dates = DatePassing.list();

    vm.toGraphDays = DatePassing.getDays();
    vm.toGraphHours = DatePassing.getHours();

    vm.isActive = isActive;
    vm.setActive = setActive;
    vm.toggleSidee = toggleSidee;

    function toggleSidee() {
      console.log('working');
      vm.showMenu = !vm.showMenu;
    }

    function isActive(value) {
      if (value === activeTab) return true;
      return false;
    }

    function setActive(value) {
      activeTab = value;
    }
  }
}());

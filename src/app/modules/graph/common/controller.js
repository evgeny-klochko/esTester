(function () {
  'use strict';

  angular
    .module('esTester.modules.graph')
    .controller('GraphCtrl', GraphCtrl);

  function GraphCtrl(DatePassing) {
    var vm = this;

    var activeTab = 1;

    vm.dates = DatePassing.list();

    vm.toGraphDays = DatePassing.getDays();
    vm.toGraphHours = DatePassing.getHours();

    vm.isActive = isActive;
    vm.setActive = setActive;

    function isActive(value) {
      if (value === activeTab) return true;
      return false;
    }

    function setActive(value) {
      activeTab = value;
    }
  }
}());

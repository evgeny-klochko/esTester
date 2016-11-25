(function () {
  'use strict';

  angular
    .module('esTester.modules.graph')
    .controller('GraphByTimeCtrl', GraphByTimeCtrl);

  function GraphByTimeCtrl(DatePassing) {
    var vm = this;

    var activeTab = 3;

    vm.dates = DatePassing.list();

    vm.toGraphDays = DatePassing.getDays();
    vm.toGraphHours = DatePassing.getHours();
    vm.toGraphDayOfWeek = DatePassing.getDayOfWeek();

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

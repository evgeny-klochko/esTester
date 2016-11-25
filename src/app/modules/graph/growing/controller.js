(function () {
  'use strict';

  angular
    .module('esTester.modules.graph')
    .controller('GraphGrowingCtrl', GraphGrowingCtrl);

  function GraphGrowingCtrl(DatePassing) {
    var vm = this;

    var activeTab = 1;

    vm.dates = DatePassing.list();
    vm.toGraphDotted = DatePassing.getGrowing();

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

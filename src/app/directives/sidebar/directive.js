(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('sideBar', sideBar);

  function sideBar() {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/sidebar/template.html',
      controller: 'SideBarCtrl',
      controllerAs: '$sbCtrl'
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('adminSideBar', adminSideBar);

  function adminSideBar() {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/admin-sidebar/template.html',
      controller: 'AdminSideBarCtrl',
      controllerAs: '$sbCtrl'
    };
  }
}());

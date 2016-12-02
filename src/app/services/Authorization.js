(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .service('Auth', ['$injector', '$sessionStorage', Auth]);

  function Auth($injector, $sessionStorage) {
    var vm = this;

    var $state = $injector.get('$state');
    var $scope = $injector.get('$rootScope');

    //
    //  Password for getting access to settings
    var rootUser = 'admin';

    vm.isAuth = function () {
      if ($sessionStorage.user) return true;
      return false;
    };

    vm.signin = function (login) {
      $sessionStorage.user = login;
      $state.go($sessionStorage.redirectTo);
    };

    vm.signout = function () {
      $sessionStorage.user = null;
      $scope.$root.user = null;
      $state.go('tests');
    };

    vm.checkAccess = function (event, toState) {
      if (toState.data && (toState.data.noLogin === false)) {
        $sessionStorage.redirectTo = toState.name;
        if ($sessionStorage.user === rootUser) {
          $scope.$root.user = $sessionStorage.user;
        } else {
          event.preventDefault();
          $scope.$state.go('auth');
        }
      }
    };
  }
}());

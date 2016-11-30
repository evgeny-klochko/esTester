(function () {
  'use strict';

  angular
    .module('esTester.modules.auth', [])
    .config(config)
    .controller('AuthorizationCtrl', AuthorizationCtrl);

  function config($stateProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        views: {
          '': {
            templateUrl: 'app/modules/auth/template.html',
            controller: 'AuthorizationCtrl',
            controllerAs: '$ctrl'
          }
        },
        data: {
          noLogin: true
        }
      })
    ;
  }

  function AuthorizationCtrl(Auth) {
    var vm = this;

    vm.correct = true;
    vm.login = '';

    vm.signin = signin;
    vm.signout = signout;

    function signin() {
      Auth.signin(vm.login);
      vm.correct = false;
    }

    function signout() {
      Auth.signout();
    }
  }
}());

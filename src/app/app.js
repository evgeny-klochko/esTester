(function () {
  'use strict';

  angular
    .module('esTester', [
      'ui.router',
      'esTester.modules',
      'esTester.directives',
      'ngStorage'
    ])
    .run(run);


  function run($rootScope, $state, $stateParams, Auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.user = null;

    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        Auth.checkAccess(event, toState);
      }
    );
  }
}());

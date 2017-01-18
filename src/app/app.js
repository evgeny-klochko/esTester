(function () {
  'use strict';

  angular
    .module('esTester', [
      'ui.router',
      'esTester.modules',
      'esTester.directives',
      'ngStorage',
      'ngAria',
      'ngAnimate',
      'ngMaterial',
      'angular-loading-bar',
      'visor'
    ])
    .run(run)
    .config(['cfpLoadingBarProvider', loadingBar]);

  function loadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.spinnerTemplate = '<div id="preloader"><div></div></div>';
  }

  function run($rootScope, $state, $stateParams, Auth, Visor) {
    Visor.run();

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

(function () {
  'use strict';

  angular
    .module('esTester.modules.test', [
      'esTester.modules.test.management',
      'esTester.modules.test.details',
      'cfp.loadingBar'
    ])
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('tests', {
        url: '/tests',
        views: {
          '': {
            templateUrl: 'app/modules/test/list/template.html',
            controller: 'TestsCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
      .state('admin', {
        url: '/admin',
        data: {
          noLogin: false
        },
        views: {
          '': {
            templateUrl: 'app/modules/test/management/review/template.html',
            controller: 'AdminCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
      .state('httpTest', {
        url: '/httpTest',
        views: {
          '': {
            templateUrl: 'app/modules/httpTest/template.html',
            controller: 'HttpTestCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
    ;
  }
}());

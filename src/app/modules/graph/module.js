(function () {
  'use strict';

  angular
    .module('esTester.modules.graph', [

    ])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('graph', {
        url: '/graph',
        data: {
          noLogin: true
        },
        views: {
          '': {
            templateUrl: 'app/modules/graph/common/template.html',
            controller: 'GraphCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
      .state('graph.byTime', {
        url: '/byTime',
        data: {
          noLogin: true
        },
        views: {
          '': {
            templateUrl: 'app/modules/graph/byTime/template.html',
            controller: 'GraphByTimeCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
      .state('graph.growing', {
        url: '/growing',
        data: {
          noLogin: true
        },
        views: {
          '': {
            templateUrl: 'app/modules/graph/growing/template.html',
            controller: 'GraphGrowingCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
      .state('graph.sandbox', {
        url: '/sandbox',
        data: {
          noLogin: true
        },
        views: {
          '': {
            templateUrl: 'app/modules/graph/sandbox/template.html',
            controller: 'SandboxCtrl',
            controllerAs: '$ctrl'
          }
        }
      })
    ;
  }
}());

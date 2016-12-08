(function () {
  'use strict';

  angular
    .module('esTester.modules', [
      'esTester.modules.test',
      'esTester.modules.graph',
      'esTester.modules.auth',
      'cfp.loadingBar',
      'infinite-scroll'
    ]);
}());

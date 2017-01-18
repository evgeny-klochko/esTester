(function () {
  'use strict';

  angular
    .module('visor', [])
    .run(run);

  function run() {
    console.log('running visor');
  }
}());

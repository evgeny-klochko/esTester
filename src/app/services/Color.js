(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .factory('Color', Color);

  function Color($localStorage) {
    var colors;
    var service;

    if (!$localStorage.colors) {
      reset();
    }

    colors = $localStorage.colors;

    service = {
      list: list,
      reset: reset,
      getDiagram: getDiagram,
      getDotted: getDotted,
      getGistogram: getGistogram,
      getLined: getLined
    };

    return service;

    function list() {
      return colors;
    }

    function getGistogram() {
      return $localStorage.colors.gistogram;
    }

    function getDotted() {
      return $localStorage.colors.dotted;
    }

    function getDiagram() {
      return $localStorage.colors.diagram;
    }

    function getLined() {
      return $localStorage.colors.lined;
    }

    function reset() {
      var gistogram = ['#ff0000', '#0000ff', '#00ff00'];
      var dotted = ['#ff0000', '#00ff00'];
      var lined = ['#ff0000', '#00ff00'];
      var diagram = ['#ff0000', '#0000ff', '#eb42f4', '#f4ce42',
        '#7f7860', '#6a915e', '#237c08', '#7c084e'];
      delete $localStorage.colors;
      $localStorage.colors = {};
      $localStorage.colors.gistogram = gistogram;
      $localStorage.colors.dotted = dotted;
      $localStorage.colors.diagram = diagram;
      $localStorage.colors.lined = lined;
    }
  }
}());

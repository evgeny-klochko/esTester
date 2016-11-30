(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('dottedGraph', ['Drawing', dottedGraph]);

  function dottedGraph(Drawing) {
    return {
      link: link,
      templateUrl: 'app/directives/dottedGraph/template.html',
      restrict: 'E'
    };

    function link(scope, element, attrs) {
      scope.data = JSON.parse(attrs.data);
      scope.axisX = attrs.axisX;
      scope.axisY = attrs.axisY;
      scope.width = attrs.ngWidth;
      scope.height = attrs.ngHeight;
      scope.max = Drawing.getMax(scope.data);
      scope.length = scope.data.length;
      scope.color = Drawing.getColor().dotted;
    }
  }
}());

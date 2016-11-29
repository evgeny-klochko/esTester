(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('lineGraph', ['Drawing', lineGraph]);

  function lineGraph(Drawing) {
    return {
      link: function (scope, element, attrs) {
        var annotation = document.getElementById('dotAnnotation');
        var canvasElement = document.getElementById('line-graph');

        scope.data = JSON.parse(attrs.data);
        scope.axisX = attrs.axisX;
        scope.axisY = attrs.axisY;
        scope.width = attrs.ngWidth;
        scope.height = attrs.ngHeight;
        scope.max = Drawing.getMax(scope.data);

        Drawing.drawingLine(scope.data, scope.width, scope.height, canvasElement, annotation);
      },
      templateUrl: 'app/directives/lineGraph/template.html',
      restrict: 'E'
    };
  }
}());

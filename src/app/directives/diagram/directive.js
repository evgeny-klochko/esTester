(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('diagram', ['Drawing', diagram]);

  function diagram(Drawing) {
    return {
      link: link,
      templateUrl: 'app/directives/diagram/template.html',
      restrict: 'E'
    };

    function link(scope, element, attrs) {
      var data;
      var legend;
      var colors;
      var canvas;
      var canvasLegend;
      var context;
      var i;

      scope.data = JSON.parse(attrs.data);
      scope.width = attrs.ngWidth;
      scope.height = attrs.ngHeight;
      scope.legend = attrs.legend;
      scope.length = scope.data.length;

      data = Drawing.parseData(scope.data);
      legend = Drawing.parseLegend(JSON.parse(attrs.data));
      colors = Drawing.getColor().diagram;
      canvasLegend = document.getElementById('piechart-legend');

      canvas = document.getElementById('piechart');
      context = canvas.getContext('2d');

      for (i = 0; i < data.length; i += 1) {
        Drawing.drawSegment(canvas, context, i, data, colors);

        if (scope.legend === 'inside') {
          Drawing.drawSegmentLabel(canvas, context, i, data, legend);
        } else if (scope.legend === 'outside') {
          Drawing.drawLegend(i, legend, colors, canvasLegend);
        } else if (scope.legend === 'both') {
          Drawing.drawSegmentLabel(canvas, context, i, data, legend);
          Drawing.drawLegend(i, legend, colors, canvasLegend);
        }
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('gistogram', gistogram);

  function gistogram(Drawing) {
    return {
      link: function (scope, element, attrs) {
        scope.data = JSON.parse(attrs.data);
        scope.axisX = attrs.axisX;
        scope.axisY = attrs.axisY;
        scope.width = attrs.ngWidth;
        scope.height = attrs.ngHeight;
        scope.max = Drawing.getMax(scope.data);
        scope.length = scope.data.length;
        scope.color = Drawing.getColor().gistogram;
      },
      templateUrl: 'app/directives/gistogram/template.html',
      restrict: 'E'
    };
  }
}());

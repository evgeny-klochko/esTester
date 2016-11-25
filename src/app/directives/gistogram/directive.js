(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('gistogram', gistogram);

  function gistogram() {
    return {
      link: function (scope, element, attrs) {
        scope.data = JSON.parse(attrs.data);
        scope.axisX = attrs.axisX;
        scope.axisY = attrs.axisY;
        scope.width = attrs.ngWidth;
        scope.height = attrs.ngHeight;
        scope.max = getMax(scope.data);
        scope.length = scope.data.length;

        function getMax(object) {
          var arrLength = object.length;
          var max = 0;
          var i;

          for (i = 0; i < arrLength; i += 1) {
            if (object[i].value > max) {
              max = object[i].value;
            }
          }
          return max;
        }
      },
      templateUrl: 'app/directives/gistogram/template.html',
      restrict: 'E'
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('diagram', diagram);

  function diagram() {
    return {
      link: function (scope, element, attrs) {
        var data;
        var legend;
        var colors;
        var canvas;
        var context;
        var i;

        scope.data = JSON.parse(attrs.data);
        scope.width = attrs.ngWidth;
        scope.height = attrs.ngHeight;
        scope.legend = attrs.legend;
        scope.max = getMax(scope.data);
        scope.length = scope.data.length;

        data = parseData(scope.data);
        legend = parseLegend(JSON.parse(attrs.data));

        colors = ['red', 'blue', 'green', 'gray', 'yellow', 'pink', 'aqua'];

        canvas = document.getElementById('piechart');
        canvas.style.backgroundColor = colors[0];
        context = canvas.getContext('2d');

        for (i = 0; i < data.length; i += 1) {
          drawSegment(canvas, context, i, data, colors);

          if (scope.legend === 'inside') {
            drawSegmentLabel(canvas, context, i, data, legend);
          } else if (scope.legend === 'outside') {
            drawLegend(i, legend, colors);
          } else if (scope.legend === 'both') {
            drawSegmentLabel(canvas, context, i, data, legend);
            drawLegend(i, legend, colors);
          }
        }
      },
      templateUrl: 'app/directives/diagram/template.html',
      restrict: 'E'
    };

    function parseData(data) {
      var parsed = [];
      var sum = getSum(data);
      var step = 360 / sum;

      data.forEach(function (item) {
        if (item.value !== 0) {
          parsed.push(Math.round(item.value * step));
        }
      });

      return parsed;
    }

    function parseLegend(data) {
      var parsed = data.filter(function (item) {
        if (item.value !== 0) {
          return item;
        }
        return null;
      });

      return parsed;
    }

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

    function drawLegend(i, data, colors) {
      var legend = document.getElementById('piechart-legend');
      var colorItem;
      legend.innerHTML += '<div class="legend-color"></div>'
        + data[i].value + ' - '
        + data[i].timeItem + '<br>';
      colorItem = document.getElementsByClassName('legend-color');
      colorItem[i].style.backgroundColor = colors[i];
    }

    function drawSegmentLabel(canvas, context, i, data, legend) {
      var x = Math.floor(canvas.width / 2);
      var y = Math.floor(canvas.height / 2);
      var angle = degreesToRadians(sumTo(data, i));
      var dx = Math.floor(canvas.width * 0.5) - 10;
      var dy = Math.floor(canvas.height * 0.05);
      var fontSize = Math.floor(canvas.height / 25);

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.textAlign = 'right';
      context.font = fontSize + 'pt Helvetica';
      context.fillText(legend[i].value, dx, dy);
      context.restore();
    }

    function degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }

    function sumTo(a, i) {
      var sum = 0;
      var j;
      for (j = 0; j < i; j += 1) {
        sum += a[j];
      }
      return sum;
    }

    function getSum(data) {
      var sum = 0;
      data.forEach(function (item) {
        sum += item.value;
      });
      return sum;
    }

    function drawSegment(canvas, context, i, data, colors) {
      var centerX = Math.floor(canvas.width / 2);
      var centerY = Math.floor(canvas.height / 2);
      var radius = Math.floor(canvas.width / 2);
      var startingAngle = degreesToRadians(sumTo(data, i));
      var arcSize = degreesToRadians(data[i]);
      var endingAngle = startingAngle + arcSize;

      context.save();

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius,
            startingAngle, endingAngle, false);
      context.closePath();

      context.fillStyle = colors[i];
      context.fill();

      context.restore();
    }
  }
}());

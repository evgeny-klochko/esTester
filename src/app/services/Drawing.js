(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .factory('Drawing', ['Color', Drawing]);

  function Drawing(Color) {
    var service = {
      drawingLine: drawingLine,
      getMax: getMax,
      getColor: getColor,
      parseData: parseData,
      parseLegend: parseLegend,
      drawLegend: drawLegend,
      drawSegment: drawSegment,
      drawSegmentLabel: drawSegmentLabel
    };

    return service;

    function getColor() {
      return Color.list();
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

    function drawingLine(data, width, height, canvasElement, annotation) {
      var canvas = canvasElement;
      var ctx = canvas.getContext('2d');

      var elements = [];
      var element = {};

      var xStep = ((width / data.length) - 2);
      var yStep = ((height / getMax(data)) - 0.3);

      ctx.strokeStyle = Color.getLined()[0];
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(0, 0);

      data.forEach(function (item, index) {
        var x = xStep * (index + 1);
        var y = yStep * item.value;
        ctx.lineTo(x, y);
        drawPoint(ctx, x, y);
        element.x = x;
        element.y = y;
        elements.push(element);
        element = {};
      });

      ctx.stroke();

      //
      //  Annotations listener
      canvas.addEventListener('mousemove', function (event) {
        var mousePos = getMousePos(canvas, event);

        elements.forEach(function (item, index) {
          if (Math.abs(item.x - mousePos.x) < 10
            && Math.abs(item.y - mousePos.y) < 10) {
            showAnnotation(index, item, data, annotation);
          }
        });
      });
    }

    function showAnnotation(index, item, data, annotation) {
      annotation.innerHTML = data[index].timeItem + ' - ' + data[index].value + ' пройдено';
      annotation.style.visibility = 'visible';
      annotation.style.left = item.x + 'px';
      annotation.style.bottom = item.y + 'px';
      annotation.style.backgroundColor = Color.getLined()[1];

      setTimeout(function () {
        annotation.style.visibility = 'hidden';
      }, 2000);
    }

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

    function drawLegend(i, data, colors, legend) {
      var colorItem;
      legend.innerHTML += '<div class="legend-color"></div>'
        + data[i].value + ' - '
        + data[i].timeItem + '<br>';
      colorItem = document.getElementsByClassName('legend-color');
      colorItem[i].style.backgroundColor = colors[i];
    }

    function drawSegment(canvas, context, i, data, colors) {
      var centerX = Math.floor(canvas.width / 2);
      var centerY = Math.floor(canvas.height / 2);
      var radius = Math.floor(canvas.width / 2);
      var startingAngle = degreesToRadians(sumTo(data, i));
      var arcSize = degreesToRadians(data[i]);
      var endingAngle = startingAngle + arcSize;
      canvas.style.backgroundColor = colors[0];

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

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      var x = ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
      var y = ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
      //
      //  turning around, because of rotated canvas
      y = Math.abs(y - canvas.height);
      return {
        x: x,
        y: y
      };
    }

    function drawPoint(ctx, x, y) {
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('lineGraph', lineGraph);

  function lineGraph() {
    return {
      link: function (scope, element, attrs) {
        scope.data = JSON.parse(attrs.data);
        scope.axisX = attrs.axisX;
        scope.axisY = attrs.axisY;
        scope.width = attrs.ngWidth;
        scope.height = attrs.ngHeight;
        scope.max = getMax(scope.data);

        drawing(scope.data, scope.width, scope.height);
      },
      templateUrl: 'app/directives/lineGraph/template.html',
      restrict: 'E'
    };

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

    function drawing(data, width, height) {
      var canvas = document.getElementById('line-graph');
      var ctx = canvas.getContext('2d');

      var elements = [];
      var element = {};

      var xStep = ((width / data.length) - 2);
      var yStep = ((height / getMax(data)) - 0.3);

      ctx.strokeStyle = '#f00';
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

      canvas.addEventListener('mousemove', function (event) {
        var mousePos = getMousePos(canvas, event);

        elements.forEach(function (item, index) {
          if (Math.abs(item.x - mousePos.x) < 10
            && Math.abs(item.y - mousePos.y) < 10) {
            showAnnotation(index, item, data);
          }
        });
      });
    }

    function showAnnotation(index, item, data) {
      var annotation = document.getElementById('dotAnnotation');
      annotation.innerHTML = data[index].timeItem + ' - ' + data[index].value + ' пройдено';
      annotation.style.visibility = 'visible';
      annotation.style.left = item.x + 'px';
      annotation.style.bottom = item.y + 'px';

      setTimeout(function () {
        annotation.style.visibility = 'hidden';
      }, 2000);
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

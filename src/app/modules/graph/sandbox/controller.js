(function () {
  'use strict';

  angular
    .module('esTester.modules.graph')
    .controller('SandboxCtrl', SandboxCtrl);

  function SandboxCtrl(Color, $scope) {
    var vm = this;
    var elem;
    var width = 200;
    var height = 200;
    var colors = Color.getDiagram();
    //  var elementsId = [];

    vm.progress = 1;
    elem = document.getElementById('sandbox');
    elem.width = width;
    elem.height = height;

    $scope.$watch('$ctrl.progress', function () {
      drawCircle(elem);
      drawSector(elem, colors[3], 0, (vm.progress * 3.6));
    }, true);

/*    function pushFigure() {
      var length = elementsId.length.toString(16);
      var numberOfNulls = 6 - length.length;
      var nulls = '';
      var id;
      var i;
      for (i = 0; i < numberOfNulls; i += 1) {
        nulls += '0';
      }
      id = '#' + nulls + length;
      elementsId.push(id);

      return id;
    }*/

    function drawCircle(canvasElement) {
      var canvas = canvasElement;
      var context = canvas.getContext('2d');

      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = (canvas.height / 6) * 2;
      var strokeWidth = radius / 2;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'transparent';
      context.fill();
      context.lineWidth = strokeWidth;
      context.strokeStyle = '#ccc';
      context.stroke();
    }

    function drawSector(canvasElement, color, start, end) {
      var canvas = canvasElement;
      var context = canvas.getContext('2d');

      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = (canvas.height / 6) * 2;
      var strokeWidth = radius / 2;
      var degreesCorrection = Math.PI / 2;

      var startAngle = degreesToRadians(start) - degreesCorrection;
      var endAngle = degreesToRadians(end) - degreesCorrection;

      context.beginPath();
      context.arc(centerX, centerY, radius, startAngle, endAngle, false);
      context.lineWidth = strokeWidth;
      context.strokeStyle = color;
      context.stroke();
    }


    function degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }
  }
}());

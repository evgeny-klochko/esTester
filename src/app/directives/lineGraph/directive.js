(function() {
	'use strict'

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
            	scope.length = scope.data.length;

                drawing(scope.data, scope.width, scope.height);


            },
            templateUrl: 'app/directives/lineGraph/template.html',
            restrict: 'E'
        }

        function getMax(object) {
            var arrLength = object.length;
            var max = 0;
            for (var i = 0; i < arrLength; i++) {
                if (object[i].value > max)
                    max = object[i].value;
            }
            return max;
        }

        function drawing(data, width, height) {
            var canvas = document.getElementById("line-graph");
            var ctx = canvas.getContext('2d');

            var xStep = ((width / data.length) - 2);
            var yStep = (height/ getMax(data) - 0.3);

            ctx.strokeStyle = '#f00';
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.moveTo(0, 0);

            data.forEach(function(item, index, arr) {
                var x = xStep * (index + 1);
                var y = yStep * item.value;
                ctx.lineTo(x, y);
                drawPoint(ctx, x, y);

            });

            ctx.stroke();
        }

        function drawPoint(ctx, x, y) {
            ctx.arc(x, y, 3, 0, 2*Math.PI);
        }
    }
})();


//xStep = width/data.length
//x = xStep * data.itemIndex

//yStep = height/max
//y = yStep * data.itemValue
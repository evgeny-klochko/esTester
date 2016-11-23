(function() {
	'use strict'

	angular
		.module('esTester.directives')
		.directive('dottedGraph', dottedGraph);

	function dottedGraph() {
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

    				for (var i = 0; i < arrLength; i++) {
    				    if (object[i].value > max)
    				    	max = object[i].value;
    				}

    				return max;
				}
            },
            templateUrl: 'app/directives/dottedGraph/template.html',
            restrict: 'E'
        }
    }
})();

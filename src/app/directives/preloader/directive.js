(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('preloader', preloader);

  function preloader($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/preloader/template.html',
      link: link
    };

    function link(scope, element, attrs) {
      var time = attrs.time;
      $timeout(function () {
        element[0].style.display = 'none';
      }, time);
    }
  }
}());

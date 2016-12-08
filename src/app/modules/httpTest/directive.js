(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .directive('scroll', scroll);

  function scroll() {
    return {
      restrict: 'A',
      scope: {
        scroll: '='
      },
      link: link
    };

    function link($scope, element) {
      var height;
      element[0].addEventListener('scroll', function () {
        if (!height) height = element.prop('clientHeight');
        if ((element.prop('scrollHeight') - element.prop('scrollTop')) < (height + 1)) {
          $scope.scroll();
        }
      });
    }
  }
}());

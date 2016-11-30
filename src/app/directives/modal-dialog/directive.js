(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('modalDialog', modalDialog);

  function modalDialog() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true,
      transclude: true,
      link: link,
      templateUrl: 'app/directives/modal-dialog/template.html'
    };

    function link(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width) {
        scope.dialogStyle.width = attrs.width;
      }
      if (attrs.height) {
        scope.dialogStyle.height = attrs.height;
      }
      scope.hideModal = function () {
        scope.show = false;
      };
    }
  }
}());

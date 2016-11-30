(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .directive('pageTop', pageTop);

  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/pageTop/template.html',
      controller: pageTopCtrl,
      controllerAs: '$ctrl'
    };

    function pageTopCtrl(Auth, $http, $localStorage) {
      var vm = this;

      vm.signout = signout;
      vm.isAuth = isAuth;
      vm.save = save;
      vm.load = load;

      function signout() {
        Auth.signout();
      }

      function isAuth() {
        return Auth.isAuth();
      }

      function save() {
        var forSave = angular.toJson($localStorage, true);
        console.log(forSave);
      }

      function load() {
        //  $localStorage.$reset();
        $http.get('data.json').success(function (data) {
          $localStorage.allTests = data.allTests;
          $localStorage.colors = data.colors;
          $localStorage.date = data.date;
          $localStorage.tests = data.tests;
        });
      }
    }
  }
}());

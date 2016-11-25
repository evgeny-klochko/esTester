(function () {
  'use strict';

  angular
    .module('esTester.directives')
    .filter('byName', byName)
    .filter('byPassed', byPassed)
    .filter('byLength', byLength);

  function byName() {
    return function (items, search) {
      var filtered = [];
      var item;
      var i;

      for (i = 0; i < items.length; i += 1) {
        item = items[i];
        if (search) {
          if (search.name === item.title.substring(0, search.name.length)) {
            filtered.push(item);
          }
        }
      }
      return filtered;
    };
  }

  function byPassed() {
    return function (items, search) {
      var filtered = [];
      var item;
      var i;

      for (i = 0; i < items.length; i += 1) {
        item = items[i];
        if (search.notPassed) {
          if (search.notPassed !== item.isPassed) {
            filtered.push(item);
          }
        } else {
          filtered.push(item);
        }
      }
      return filtered;
    };
  }

  function byLength() {
    return function (items, search) {
      var filtered = [];
      var item;
      var i;

      for (i = 0; i < items.length; i += 1) {
        item = items[i];

        if (search.long) {
          if (item.questions.length > 1) {
            filtered.push(item);
          }
        } else {
          filtered.push(item);
        }
      }
      return filtered;
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .controller('HttpTestCtrl', HttpTestCtrl)
    .config(['cfpLoadingBarProvider', load]);

  function load(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.parentSelector = '.description';
    cfpLoadingBarProvider.spinnerTemplate = '<div id="preloader"><div></div></div>';
  }


  function HttpTestCtrl($scope, reqService, cfpLoadingBar) {
    var vm = this;

    vm.busy = false;
    vm.posts = [];
    vm.comments = null;
    vm.post = null;
    vm.photos = null;
    vm.isLoading = false;
    vm.searchInput = '';

    vm.getPost = getPost;
    vm.getPosts = getPosts;
    vm.getPhotos = getPhotos;
    vm.getComments = getComments;
    vm.getPostByUserId = getPostByUserId;
    vm.start = start;
    vm.loadMore = loadMore;
    vm.count = count;

    //  getPhotos();
    function count() {
      console.log($scope.$$watchers);
    }

    $scope.$watch('$ctrl.searchInput', function () {
      if (vm.searchInput === '') {
        //  etPosts();
        getTenPosts();
        getPost(1);
      } else {
        getPostByUserId(vm.searchInput);
      }
    });

    function loadMore() {
      getTenPosts();
    }

    function start() {
      cfpLoadingBar.start();
    }

    function getTenPosts() {
      var i;
      if (vm.busy) return;
      vm.busy = true;
      reqService.getTenPosts().then(function (data) {
        //  vm.posts = data;
        for (i = 0; i < data.length; i += 1) {
          vm.posts.push(data[i]);
        }
        vm.busy = false;
      });
    }

    function getPost(number) {
      vm.isLoading = true;
      vm.comments = null;
      cfpLoadingBar.start();
      reqService.getPost(number).then(function (data) {
        vm.post = data;
        vm.isLoading = false;
        cfpLoadingBar.complete();
      });
    }

    function getPosts() {
      reqService.getPosts().then(function (data) {
        vm.posts = data;
      });
    }

    function getPhotos() {
      reqService.getPhotos().then(function (data) {
        vm.photos = data;
      });
    }
    function getComments(post) {
      reqService.getComments(post).then(function (data) {
        vm.comments = data;
      });
    }
    function getPostByUserId(id) {
      reqService.getPostByUserId(id).then(function (data) {
        vm.posts = data;
      });
    }
  }
}());

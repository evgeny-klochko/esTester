(function () {
  'use strict';

  angular
    .module('esTester.modules')
    .factory('reqService', reqService);

  function reqService($http) {
    var service;

    var dataUrl = 'https://jsonplaceholder.typicode.com';
    var loaded = -11;


    service = {
      getPosts: getPosts,
      getPost: getPost,
      getPhotos: getPhotos,
      getComments: getComments,
      getPostByUserId: getPostByUserId,
      getTenPosts: getTenPosts
    };

    return service;

    function getPosts() {
      return $http.get(dataUrl + '/posts').then(function (result) {
        return result.data;
      });
    }
    function getTenPosts() {
      loaded += 11;
      return $http.get(dataUrl + '/posts').then(function (result) {
        return result.data.splice(loaded, 11);
      });
    }
    function getPost(number) {
      return $http.get(dataUrl + '/posts/' + number).then(function (result) {
        return result.data;
      });
    }
    function getPostByUserId(number) {
      return $http.get(dataUrl + '/posts?userId=' + number).then(function (result) {
        return result.data;
      });
    }
    function getPhotos() {
      return $http.get(dataUrl + '/photos').then(function (result) {
        return result.data;
      });
    }
    function getComments(post) {
      return $http.get(dataUrl + '/posts/' + post + '/comments').then(function (result) {
        return result.data;
      });
    }
  }
}());

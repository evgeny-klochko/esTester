(function () {
  'use strict';

  angular
    .module('visor')
    .factory('Visor', Visor);


  function Visor() {
    var service;
    var isActive = false;
    var canvas;
    var url;
    var ctx;

    service = {
      run: run,
      save: save
    };

    return service;

    function update() {
      console.log('upp');
    }
    function load () {
      var img = document.getElementById('loadImg');
      img.src = url;
    }
    function save() {
      var button = document.getElementById('btn-download');

      ctx.beginPath();
      ctx.strokeStyle = getRandomColor();
      var dataURL = canvas.toDataURL();
      url = dataURL;
      button.href = dataURL;
    }

    function drawPoint(ctx, x, y) {
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
    }

    function point(ctx, x, y){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+1, y+1);
      ctx.stroke();
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function reranderCanvas() {
      var body = angular.element(document.querySelector("body"));
      var height = body.prop('clientHeight');
      var width = body.prop('clientWidth');
      //console.log( width + ' ' + height);
      var newDirective = angular.element(document.querySelector("#glob"));
      newDirective[0].height = height;
      newDirective[0].width = width;
    }

    function run() {
      var body = angular.element(document.querySelector("body"));
      var height = window.innerHeight;
      var width = window.innerWidth;
      var newDirective = angular.element('<canvas id="glob"></canvas>');
      console.log(newDirective);
      newDirective[0].height = height;
      newDirective[0].width = width;
      body.append(newDirective);

      canvas = angular.element(document.querySelector("#glob"))[0];
      ctx = canvas.getContext('2d');

      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;

/*      for (var i = 0; i < buttons.length; i += 1) {
        buttons[i].addEventListener('mousemove', function (event) {
          console.log(event);
        });
      }*/

/*      buttons.forEach(function (item) {
        item.addEventListener('mouseover', function (event) {
          console.log(event);
        });
      });*/

/*      body[0].addEventListener('mouseover', function (event) {
        console.log('ff');
      });*/



      window.addEventListener('resize', function (event) {
        reranderCanvas();
      });
      window.addEventListener('scroll', function (event) {

      });

/*      body[0].addEventListener('click', function (event) {
        var x = event.clientX;
        var y = event.clientY;
        console.log(x + ' ' + y);
        save();
      });*/

      var loadBtn = document.getElementById('test');
      loadBtn.addEventListener('click', function (e) {
        load();
      });
      body[0].addEventListener('click', function(e){
        save();
      });

      body[0].addEventListener('mousemove', function (e) {
        e = e || window.event

        if (e.pageX == null && e.clientX != null ) {
          var html = document.documentElement
          var body = document.body
          e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
          e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
        }
          point(ctx, e.pageX, e.pageY);
          //ctx.stroke();
      });
    }
  }
}());

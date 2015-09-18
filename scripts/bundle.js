(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {
  //variables

  var $form = $('form');
  var $imageLink = $('#image-link');
  var $imageCaption = $('#image-caption');
  //functions

  function post() {
    $.post('http://tifye.herokuapp.com/collections/void', { imageLink: $imageLink, imageCaption: $imageCaption }, function (response) {
      console.log('posted', response);
    }, 'json');
  };

  function render() {
    $.get('http://tifye.herokuapp.com/collections/void', function (response) {
      console.log(response);
    });
  }

  function resetInputs() {
    $imageLink.val('');
    $imageCaption.val('');
  }
  //event listeners

  $('#nav-bar-add').click(function () {
    $form.toggle();
    resetInputs();
  });
  $('#column-add').click(function () {
    $form.toggle();
    resetInputs();
  });
  $('#cancel').click(function () {
    $form.hide();
    resetInputs();
  });

  $('#submit').click(function () {
    post();
    render();
  });
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
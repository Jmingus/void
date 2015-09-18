(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {
  //variables

  var $form = $('form');
  var $imageLink = $('#image-link');
  var $imageCaption = $('#image-caption');
  //functions

  function validateInput(imagelink, imagecaption) {
    var validFlag = false;
    if (imagelink.indexOf('http://') !== -1 || imagelink.indexOf('https://') !== -1) {
      if (imagelink.indexOf('.jpg') !== -1 || imagelink.indexOf('.png') !== -1 || imagelink.indexOf('.jpeg') !== -1 || imagelink.indexOf('.gif') !== -1) {
        if (imagecaption !== '') {
          validFlag = true;
        } else {
          console.log('Image Caption can\'t be blank');
        };
      } else {
        console.log('Image isn\'t a valid image type, must be a jpg, png, jpeg or gif');
      };
    } else {
      console.log('Links should start with http:// or https://');
    };
    if (validFlag === false) {
      return false;
    } else {
      return true;
    };
  };

  function post() {
    if (validateInput($imageLink.val(), $imageCaption.val())) {
      $.post('http://tiyfe.herokuapp.com/collections/void', { imageLink: $imageLink.val(), imageCaption: $imageCaption.val() }, function (response) {
        console.log('posted', response);
      }, 'json');
    } else {
      console.log('Im not sure!');
    }
  };

  function render() {
    $.get('http://tiyfe.herokuapp.com/collections/void', function (response) {}, 'json');
  };

  function resetInputs() {
    $imageLink.val('');
    $imageCaption.val('');
  };
  //event listeners

  $('#nav-bar-add').click(function () {
    $form.toggle('slow');
    resetInputs();
  });
  $('#column-add').click(function () {
    $form.toggle('slow');
    resetInputs();
  });
  $('#cancel').click(function () {
    $form.hide();
    resetInputs();
  });

  $('#submit').click(function () {
    post();
    render();
    resetInputs();
  });
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
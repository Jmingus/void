(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {
  //variables
  render();
  var $form = $('#image-form');
  var $imageLink = $('#image-link');
  var $imageLinkErrorBox = $('#image-link-error-box');
  var $imageCaption = $('#image-caption');
  var $imageCaptionErrorBox = $('#image-caption-error-box');

  //functions

  function validateInput(imagelink, imagecaption) {
    var imagelinkvalid = false;
    var imagecaptionvalid = false;
    var errormessage = null;

    if (imagelink.indexOf('http://') !== -1 || imagelink.indexOf('https://') !== -1) {
      if (imagelink.indexOf('.jpg') !== -1 || imagelink.indexOf('.png') !== -1 || imagelink.indexOf('.jpeg') !== -1 || imagelink.indexOf('.gif') !== -1) {
        imagelinkvalid = true;
        removeErrors($imageLinkErrorBox);
      } else {
        removeErrors($imageLinkErrorBox);
        errormessage = 'Image isn\'t a valid image type, must be a jpg, png, jpeg or gif';
        appendErrors(errormessage, $imageLinkErrorBox);
      };
    } else {
      errormessage = 'Links should start with http:// or https://';
      appendErrors(errormessage, $imageLinkErrorBox);
    };

    if (imagecaption !== '') {
      imagecaptionvalid = true;
      removeErrors($imageCaptionErrorBox);
    } else {
      errormessage = 'Image caption can\'t be blank';
      appendErrors(errormessage, $imageCaptionErrorBox);
    };
    if (imagelinkvalid === false || imagecaptionvalid === false) {
      return false;
    } else {
      return true;
    };
  };

  function appendErrors(errormessage, location) {
    location.show();
    if (location.html().indexOf('<div>' + errormessage + '</div>') === -1) {
      location.append('<div>' + errormessage + '</div>');
    }
  };

  function removeErrors(location) {
    location.html('');
    location.hide();
  };

  function post() {
    if (validateInput($imageLink.val(), $imageCaption.val())) {
      $.post('http://tiyfe.herokuapp.com/collections/void', { imageLink: $imageLink.val(), imageCaption: $imageCaption.val() }, function (response) {
        console.log('posted', response);
      }, 'json');
      return true;
    } else {
      return false;
    }
  };

  function render() {
    $('#image-container').empty();
    $.get('http://tiyfe.herokuapp.com/collections/void', function (response) {
      response.forEach(function (response) {
        $('#image-container').append('<div class="image-box"><img src="' + response.imageLink + '"></div>' + '<div class="image-caption-container">' + response.imageCaption + '</div><hr>');
      });
    }, 'json');
  };

  function resetInputs() {
    $imageLink.val('');
    $imageCaption.val('');
  };

  function resetErrorBoxes() {
    $imageCaptionErrorBox.html('');
    $imageCaptionErrorBox.hide();
    $imageLinkErrorBox.html('');
    $imageLinkErrorBox.hide();
  };

  function successPost() {
    $('#successMessageBox').show();
    $('#successMessageBox').fadeOut(4000);
  };
  //event listeners

  window.onload = function () {
    $('body').append('<div id="mask"></div');
    $('#mask').fadeIn(300);
  };
  $('#nav-bar-add').click(function () {
    $form.toggle('slow');
    resetInputs();
    resetErrorBoxes();
  });

  $('#sign-in-link').click(function () {
    $(this).addClass('tab-active').siblings().removeClass('tab-active');
    $('#sign-in').show();$('#sign-up').hide();$('p').hide();
  });
  $('#sign-up-link').click(function () {
    $(this).addClass('tab-active').siblings().removeClass('tab-active');
    $('#sign-up').show();$('#sign-in').hide();$('p').hide();
  });

  $('#column-add').click(function () {
    $form.toggle('slow');
    resetInputs();
    resetErrorBoxes();
  });
  $('#cancel').click(function () {
    $form.hide();
    resetInputs();
    resetErrorBoxes();
  });

  $('#submit').click(function (e) {
    if (post()) {
      render();
      resetInputs();
      successPost();
    }
  });
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
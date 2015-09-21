'use strict';
$(document).ready(function(){
  //variables
  render()
  var $form = $('#image-form');
  var $imageLink = $('#image-link');
  var $imageLinkErrorBox = $('#image-link-error-box');
  var $imageCaption = $('#image-caption');
  var $imageCaptionErrorBox = $('#image-caption-error-box');
  var currentUserName = null;
  var url = 'http://tiyfe.herokuapp.com/collections/void';

  //functions

  function validateInput(imagelink,imagecaption){
    var imagelinkvalid = false;
    var imagecaptionvalid = false;
    var errormessage = null;

    if(imagelink.indexOf('http://') !== -1 || imagelink.indexOf('https://') !== -1){
      if(imagelink.indexOf('.jpg') !== -1 || imagelink.indexOf('.png') !== -1 || imagelink.indexOf('.jpeg') !== -1 || imagelink.indexOf('.gif') !== -1){
          imagelinkvalid = true
          removeErrors($imageLinkErrorBox);
      }else{
       removeErrors($imageLinkErrorBox);
       errormessage = 'Image isn\'t a valid image type, must be a jpg, png, jpeg or gif';
       appendErrors(errormessage, $imageLinkErrorBox);
      };
    }else{
      errormessage = 'Links should start with http:// or https://';
      appendErrors(errormessage, $imageLinkErrorBox);
    };

    if(imagecaption !== ''){
      imagecaptionvalid = true;
      removeErrors($imageCaptionErrorBox);
    }else{
      errormessage = 'Image caption can\'t be blank';
      appendErrors(errormessage, $imageCaptionErrorBox);
    };
    if(imagelinkvalid === false || imagecaptionvalid === false){
      return false;
    }else{
      return true;
    };
  };

  function appendErrors(errormessage,location){
    location.show()
    if(location.html().indexOf('<div>' +errormessage+ '</div>') === -1){
      location.append('<div>' + errormessage + '</div>');
    }
  };

  function removeErrors(location){
    location.html('');
    location.hide();
  };

  function post(){
    if(validateInput($imageLink.val(), $imageCaption.val())){
      $.post(
          url,
          {imageLink: $imageLink.val(), imageCaption: $imageCaption.val()},
          function (response){
            console.log('posted', response)
          },
          'json'
        );
      return true;
    }else{
      return false;
    }

  };

  function signUp(){
    var validUserNameFlag = true

    var dataBase = $.get(url,function(response){console.log(response)},'json')
    for(var i = 0; i < dataBase.length; i++){
      if(dataBase[i].user === $('#sign-up-username').val()){
           validUserNameFlag = false;
      }

      if(validUserNameFlag === false){
        console.log('username already taken!')
        return false;
      }else{
        $.post(url,{user: $('#sign-up-username').val(), password: $('#sign-up-password').val()},
          function (response){console.log('User created', response);},
          'json');
        currentUserName = $('#sign-up-username').val();
        return true;
      }
  }

  };

  function signIn(){

  };

  function render(){
    $('#image-container').empty();
    $.get(
        url,
        function (response){
          response.forEach(function(response){
            $('#image-container').append('<div class="image-box"><img src="'+response.imageLink+'"></div>'+'<div class="image-caption-container">'+response.imageCaption+'</div><hr>');
          })
        },
        'json'
      );

  };

  function resetInputs(){
    $imageLink.val('');
    $imageCaption.val('');
  };

  function resetErrorBoxes(){
    $imageCaptionErrorBox.html('');
    $imageCaptionErrorBox.hide();
    $imageLinkErrorBox.html('');
    $imageLinkErrorBox.hide();
  };

  function hideEntryBox(){
    $('#mask').hide();
    $('#sign-in-and-sign-up').hide();
  };

  function successPost(){
    $('#successMessageBox').show();
    $('#successMessageBox').fadeOut(4000);
  };
  //event listeners

  window.onload = function(){
    $('body').append('<div id="mask"></div');
    $('#mask').fadeIn(300);
  };

  $('#nav-bar-add').click(function(){
    $form.toggle('slow');
    resetInputs();
    resetErrorBoxes();
  });

  $('#sign-in-link').click(function(){
    $(this).addClass('tab-active').siblings().removeClass('tab-active');
    $('#sign-in-form').show();$('#sign-up-form').hide();$('p').hide()
  });

  $('#sign-up-link').click(function(){
    $(this).addClass('tab-active').siblings().removeClass('tab-active');
    $('#sign-up-form').show();$('#sign-in-form').hide();$('p').hide()
  });

  $('#column-add').click(function(){
    $form.toggle('slow');
    resetInputs();
    resetErrorBoxes();
  });

  $('#cancel').click(function(){
    $form.hide();
    resetInputs();
    resetErrorBoxes();
  });

  $('#submit').click(function(){
    if(post()){
      render();
      resetInputs();
      successPost();
    };
  });

  $('#sign-up-form').submit(function(){
    if(signUp() === true){
      console.log(currentUserName)
      hideEntryBox();
    };
  });

});

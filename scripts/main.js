'use strict';
$(document).ready(function(){
  //variables

  var $form = $('form');
  var $imageLink = $('#image-link');
  var $imageLinkErrorBox = $('#image-link-error-box')
  var $imageCaption = $('#image-caption');
  var $imageCaptionErrorBox = $('#image-caption-error-box')

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
          'http://tiyfe.herokuapp.com/collections/void',
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

  function render(){
    $.get(
        'http://tiyfe.herokuapp.com/collections/void',
        function (response){

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

  function successPost(){
    $('#successMessageBox').show();
    $('#successMessageBox').fadeOut(4000);
  };
  //event listeners

  $('#nav-bar-add').click(function(){
    $form.toggle('slow');
    resetInputs();
    resetErrorBoxes();
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

  $('#submit').click(function(e){
    if(post()){
      render();
      resetInputs();
      successPost();
    }
  });

});

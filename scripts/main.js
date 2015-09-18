'use strict';
$(document).ready(function(){
  //variables

  var $form = $('form');
  var $imageLink = $('#image-link');
  var $imageCaption = $('#image-caption');
  //functions

  function validateInput(imagelink,imagecaption){
    var validFlag = false
    if(imagelink.indexOf('http://') !== -1 || imagelink.indexOf('https://') !== -1){
      if(imagelink.indexOf('.jpg') !== -1 || imagelink.indexOf('.png') !== -1 || imagelink.indexOf('.jpeg') !== -1 || imagelink.indexOf('.gif') !== -1){
        if(imagecaption !== ''){
          validFlag = true
        }else{
          console.log('Image Caption can\'t be blank');
        };
      }else{
        console.log('Image isn\'t a valid image type, must be a jpg, png, jpeg or gif');
      };
    }else{
      console.log('Links should start with http:// or https://');
    };
    if(validFlag === false){
      return false
    }else{
      return true;
    };
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
    }else{
      console.log('Im not sure!')
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
    $imageLink.val('')
    $imageCaption.val('')
  };
  //event listeners

  $('#nav-bar-add').click(function(){
    $form.toggle('slow');
    resetInputs();
  });
  $('#column-add').click(function(){
    $form.toggle('slow');
    resetInputs();
  });
  $('#cancel').click(function(){
    $form.hide();
    resetInputs();
  });

  $('#submit').click(function(){
    post();
    render();
    resetInputs();
  });

});

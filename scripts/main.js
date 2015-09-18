'use strict';
$(document).ready(function(){
  //variables

  var $form = $('form')
  var $imageLink = $('#image-link')
  var $imageCaption = $('#image-caption')
  //functions

  function post(){
    $.post(
        'http://tifye.herokuapp.com/collections/void',
        {imageLink: $imageLink, imageCaption: $imageCaption},
        function (response){
          console.log('posted', response)
        },
        'json'
      );
  };

  function render(){
    $.get(
        'http://tifye.herokuapp.com/collections/void',
        function (response){
          console.log(response)
        }
      )
  }

  function resetInputs(){
    $imageLink.val('')
    $imageCaption.val('')
  }
  //event listeners

  $('#nav-bar-add').click(function(){
    $form.toggle();
    resetInputs();
  });
  $('#column-add').click(function(){
    $form.toggle();
    resetInputs();
  })
  $('#cancel').click(function(){
    $form.hide();
    resetInputs();
  })

  $('#submit').click(function(){
    post();
    render();
  })
});

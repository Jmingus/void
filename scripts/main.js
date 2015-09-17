'use strict';
$(document).ready(function(){
  //variables
  var $form = $('form')
  //functions
  //event listeners
  $('#nav-bar-add').click(function(){
    $form.toggle();
  });
  $('#column-add').click(function(){
    $form.toggle();
  })
  $('#cancel').click(function(){
    $form.hide();
  })

});

/*
 * This JavaScript doesn't do anything. The file exists just to demonstrate
 * including static assets from the HTML in themes.
 */

$(document).ready(function(){
  $('.dropdown-submenu a.submenu').on("mouseover", function(e){
    $('.dropdown-submenu > ul').hide();
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});
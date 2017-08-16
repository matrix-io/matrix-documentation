/*
 * This JavaScript doesn't do anything. The file exists just to demonstrate
 * including static assets from the HTML in themes.
 */

$(function () {
  $('.dropdown-submenu a.submenu').on("mouseover", function (e) {
    $('.dropdown-submenu > ul').hide();
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });

  console.log('weg')

  let latchY = 0
  let caught = false;
  let t;

  $('html').on('mousewheel', function (e) {
    let pos = document.getElementsByClassName('toc')[0].getClientRects()[0];
    console.log('pos', ':', pos);

    if (!caught && window.scrollY > latchY && pos.top < 100) {
      // find roughly where the top of this thing is
      latchY = window.scrollY;
      console.log('latch', ':', latchY);
      $('.toc').addClass('float');
      caught = true
    } else if (caught && window.scrollY < latchY) {
      latchY = 0;
      caught = false;
      console.log('unlatch', ':', latchY);
      $('.toc').removeClass('float');
    }


  })
});
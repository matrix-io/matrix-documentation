$(function () {
  //Drop Down Submenu Menu\\
  $('.dropdown-submenu a.submenu').on("mouseover", function (e) {
    $('.dropdown-submenu > ul').hide();
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });

  //User Scroll Tracking\\
  let latchY = 0
  let caught = false;
  let t;

  $('html').on('mousewheel', function (e) {
    let pos = document.getElementsByClassName('toc')[0].getClientRects()[0];

    if (!caught && window.scrollY > latchY && pos.top < 100) {
      // find roughly where the top of this thing is
      latchY = window.scrollY;
      $('.toc').addClass('float');
      caught = true
    } else if (caught && window.scrollY < latchY) {
      latchY = 0;
      caught = false;
      $('.toc').removeClass('float');
    }
  });
});
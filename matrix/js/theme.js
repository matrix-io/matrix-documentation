$(function () {
  /* Clipboard integration */
  if (ClipboardJS.isSupported()){
    // get all code elements
    var allCodeBlocksElements = $( "div.codehilite pre" );

    // For each element, do the following steps
    allCodeBlocksElements.each(function(ii) {
    // define a unique id for this element and add it
    var currentId = "codeblock" + (ii + 1);
    $(this).attr('id', currentId);

    // create a button that's configured for clipboard.js
    // point it to the text that's in this code block
    // add the button just after the text in the code block w/ jquery
    var clipButton = '<a class="btn copybtn" data-clipboard-target="#' + currentId + '"><img src="https://clipboardjs.com/assets/images/clippy.svg" width="13" alt="Copy to clipboard"></a>';
        $(this).after(clipButton);
    });

    // tell clipboard.js to look for clicks that match this query
    var clipboard = new ClipboardJS('.btn');

    // deselect 
    clipboard.on('success', (event)=> {
      event.clearSelection();
    });
  }

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
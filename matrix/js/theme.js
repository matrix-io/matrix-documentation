$(function () {
  //Clipboard.js integration\\

  // find all code block elements
  if (ClipboardJS.isSupported()){
    var allCodeBlocksElements = $( "div.codehilite pre" );

    // For each element, do the following steps
    allCodeBlocksElements.each(function(ii) {
    // define a unique id for this element and add it
    var currentId = "codeblock" + (ii + 1);
    $(this).attr('id', currentId);

    // create the button just after the text in the code block
    var clipButton = '<a class="btn copybtn" data-clipboard-target="#'+currentId+'"><img src="https://clipboardjs.com/assets/images/clippy.svg" draggable="false" width="13" alt="Copy to clipboard"></a>';
        $(this).after(clipButton);
    });

    // initialize each clipboard button
    var clipboard = new ClipboardJS('.btn');

    // cleanup & Copy Notification
    clipboard.on('success', (event)=> {
      // show copy notification
      var buttonIndex = event.trigger.dataset.clipboardTarget.replace(/[^0-9]/g,'')-1;
      var copyButton = $(".copybtn:eq("+buttonIndex+")");
      copyButton.tooltip({trigger: 'click'});
      copyButton.tooltip('hide').attr('data-original-title', "copied!").tooltip('show');

      // delay to remove copy notification
      setTimeout(function() {
        copyButton.tooltip('hide');
        copyButton.css("background-color","white");
      }, 1000);

      // prevent code block from being highlighted
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
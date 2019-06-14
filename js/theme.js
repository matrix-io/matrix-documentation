$(function () {
  //Clipboard.js integration\\
  if (ClipboardJS.isSupported()){
    var allCodeBlocksElements = $( "div.codehilite pre" );

    // For each element, do the following steps
    allCodeBlocksElements.each(function(ii) {
    // define a unique id for this element and add it
    var currentId = "codeblock" + (ii + 1);
    $(this).attr('id', currentId);

    // create the button just after the text in the code block
    var clipButton = '<a class="btn copybtn" data-clipboard-target="#'+currentId+'" allow-copy-notify="true"><img src="'+base_url+'/img/clippy.svg" draggable="false" width="13" alt="Copy to clipboard"></a>';
        $(this).after(clipButton);
    });

    var clipboard = new ClipboardJS(".btn");

    clipboard.on("success", (event)=> {
      // find button html element
      var buttonIndex = event.trigger.dataset.clipboardTarget.replace(/[^0-9]/g,'')-1;
      var copyButton = $(".copybtn:eq("+buttonIndex+")");

      // button click animation
      copyButton.addClass("copy-success");
      setTimeout(function(){copyButton.removeClass("copy-success");},100);

      // show copy notification
      if(copyButton.attr("allow-copy-notify") === "true"){
        copyButton.tooltip({trigger: "click"});
        copyButton.attr("allow-copy-notify", false);
        copyButton.tooltip("hide").attr("data-original-title", "copied!").tooltip("show");
        
        // remove copy notification
        setTimeout(function() {
          copyButton.tooltip("hide");
          copyButton.css("background-color","#cccccd");
          copyButton.attr("allow-copy-notify", true);
        }, 1000);
      }
      
      // prevent copy notification spam
      copyButton.tooltip().off();

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
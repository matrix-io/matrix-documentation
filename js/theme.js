$(function () {
  //Syntax Highlighting (prism.js)\\
  $('pre code').each(function(i, block) {
    Prism.highlightElement(block);//apply highlight
  });
  

  //Clipboard.js\\
  !function(){if("undefined"!=typeof self&&self.Prism&&self.document){var t=[],e={},n=function(){};Prism.plugins.toolbar={};var a=Prism.plugins.toolbar.registerButton=function(n,a){var o;o="function"==typeof a?a:function(t){var e;return"function"==typeof a.onClick?(e=document.createElement("button"),e.type="button",e.addEventListener("click",function(){a.onClick.call(this,t)})):"string"==typeof a.url?(e=document.createElement("a"),e.href=a.url):e=document.createElement("span"),e.textContent=a.text,e},t.push(e[n]=o)},o=Prism.plugins.toolbar.hook=function(a){var o=a.element.parentNode;if(o&&/pre/i.test(o.nodeName)&&!o.parentNode.classList.contains("code-toolbar")){var r=document.createElement("div");r.classList.add("code-toolbar"),o.parentNode.insertBefore(r,o),r.appendChild(o);var i=document.createElement("div");i.classList.add("toolbar"),document.body.hasAttribute("data-toolbar-order")&&(t=document.body.getAttribute("data-toolbar-order").split(",").map(function(t){return e[t]||n})),t.forEach(function(t){var e=t(a);if(e){var n=document.createElement("div");n.classList.add("toolbar-item"),n.appendChild(e),i.appendChild(n)}}),r.appendChild(i)}};a("label",function(t){var e=t.element.parentNode;if(e&&/pre/i.test(e.nodeName)&&e.hasAttribute("data-label")){var n,a,o=e.getAttribute("data-label");try{a=document.querySelector("template#"+o)}catch(r){}return a?n=a.content:(e.hasAttribute("data-url")?(n=document.createElement("a"),n.href=e.getAttribute("data-url")):n=document.createElement("span"),n.textContent=o),n}}),Prism.hooks.add("complete",o)}}();
  (function(){
    if (typeof self === 'undefined' || !self.Prism || !self.document) {
      return;
    }

    if (!Prism.plugins.toolbar) {
      console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');

      return;
    }

    var ClipboardJS = window.ClipboardJS || undefined;

    if (!ClipboardJS && typeof require === 'function') {
      ClipboardJS = require('clipboard');
    }

    var callbacks = [];

    if (!ClipboardJS) {
      var script = document.createElement('script');
      var head = document.querySelector('head');

      script.onload = function() {
        ClipboardJS = window.ClipboardJS;

        if (ClipboardJS) {
          while (callbacks.length) {
            callbacks.pop()();
          }
        }
      };

      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js';
      head.appendChild(script);
    }

    Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
      var linkCopy = document.createElement('a');
      linkCopy.textContent = 'Copy';

      if (!ClipboardJS) {
        callbacks.push(registerClipboard);
      } else {
        registerClipboard();
      }

      return linkCopy;

      function registerClipboard() {
        var clip = new ClipboardJS(linkCopy, {
          'text': function () {
            return env.code;
          }
        });

        clip.on('success', function() {
          linkCopy.textContent = 'Copied!';

          resetText();
        });
        clip.on('error', function () {
          linkCopy.textContent = 'Press Ctrl+C to copy';

          resetText();
        });
      }

      function resetText() {
        setTimeout(function () {
          linkCopy.textContent = 'Copy';
        }, 5000);
      }
    });
  })();

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
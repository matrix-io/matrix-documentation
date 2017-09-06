(function($) {
  $.ajaxChimp.translations.us = {
    'submit': 'Submitting...',
    0: 'Thank you. We have sent you a confirmation e-mail.',
    1: 'Please enter a value.',
    2: 'An email address must contain a single @.',
    3: 'The domain portion of the email address is invalid (the portion after the @: ).',
    4: 'The username portion of the email address is invalid (the portion before the @: ).',
    5: 'This email address looks fake or invalid. Please enter a real email address.'
  };

  $('#newsletter-form').ajaxChimp({
    url: 'https://admobilize.us6.list-manage.com/subscribe/post?u=456538565a6b42a1ca52edfd2&amp;id=a9216adb2d',
    language: 'us',
    callback: function(respnse) {
      $('#newsletter-form').find('.warning').each(function() {
        $(this).removeClass('warning');
      });

      if(respnse.msg[0] == '0') {
        $('#newsletter-form').find('#newsletter-email').addClass('warning');
      }
    }
  });
})(jQuery);

function notify(message, status) {
  $('.notify').html(message).fadeIn();
  $('.notify').addClass(status);
  $('.notify').css('top', $(window).scrollTop());

  setTimeout(function() {
    $('.notify').html('').removeClass(status).fadeOut();
  }, 3000);
}

function openModal(selector, msg) {
  $(selector+' .content').html(msg);
  $('.overlay').css('top', $('body').scrollTop());

  $('.overlay').addClass('active');
  $(selector).addClass('active');
  $('body').addClass('noscroll');

  $(selector+' .fa-times').click(closeModal);
  $(selector+' .cancel').click(closeModal);
}

function closeModal() {
  $('.overlay').removeClass('active');
  $('.modal').removeClass('active');
  $('body').removeClass('noscroll');
}

function updateUrl(url, pageNum) {
  var pageParams = 'page='+pageNum;
  currentParams = url.match(/page=\d+/);
  if (currentParams === null) {
    if (url.indexOf('?') > -1) {
      pageParams = '&'+pageParams;
    } else {
      pageParams = '?'+pageParams;
    }
    url = url + pageParams;
  } else {
    url = url.replace(/page=\d+/, pageParams)
  }
  return url;
}

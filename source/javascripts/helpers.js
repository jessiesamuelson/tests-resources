function notify(message, status) {
  $('.notify').html(message).fadeIn();
  $('.notify').addClass(status);
  $('.notify').css('top', $(window).scrollTop());

  setTimeout(function() {
    $('.notify').html('').removeClass(status).fadeOut();
  }, 3000);
}

function openModal(container, msg) {
  $(container+' .modal .content').html(msg);
  $('.overlay').css('top', $('body').scrollTop());

  $('.overlay').addClass('active');
  $(container+' .modal').addClass('active');
  $('body').addClass('noscroll');

  $(container+' .modal .fa-times').click(closeModal);
  $(container+' .modal .cancel').click(closeModal);
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

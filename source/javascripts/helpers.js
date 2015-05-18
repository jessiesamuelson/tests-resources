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
  var perPage = '20',
      oldParams;
  if (url.match(/per_page=\d+/) != null) {
    perPage = url.match(/per_page=\d+/)[0].replace('per_page=', '');
  }
  var newParams = '?per_page='+perPage+'&page='+pageNum;

  if (url.match(/\?.+/) != null) {
    oldParams = url.match(/\?.+/)[0];
    url = url.replace(oldParams, newParams);
  } else {
    url += newParams;
  } 
  
  return url;
}

function escapeHtml(input) {
 var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  var escape = function (string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  if (typeof(input) === 'object') {
    for (key in input) {
      input[key] = escape(input[key]);
    }
  } else if (typeof(input) === 'string') {
    input = escape(input);
  } else if (typeof(input) === 'array') {
    for (element in input) {
      element = escape(element);
    }
  }

  return input;
}

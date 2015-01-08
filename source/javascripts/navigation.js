$(function() {
  authenticate();

  detectSection();
  $(window).on('popstate', detectSection);
  clearResultButton();

  $('.channels nav a').click(function(e) {
    toggleSection($(e.target));
  });

});


function toggleSection($target) {
  if ($target.attr('href').indexOf('#') > -1) {
    $('.current').removeClass('current');
    var sectionName = $.trim($target.attr('class').replace('current', ''));

    $target.parent().addClass('current');
    $('section.'+sectionName).addClass('current');
  }
}

function detectSection() {
  var anchor = window.location.hash;
  var pageUrl = window.location.href;
  if (pageUrl.indexOf('/channel-manager') > -1 && anchor === '') {
    window.location.hash = '#all';
    anchor = '#all';
  }
  toggleSection($("a[href='"+anchor+"']"));
}

function clearResultButton() {
  if ($('.search-channels .channel-list').children().length > 0) {
    $('.search-channels .clear').addClass('dirty');
  } else {
    $('.search-channels .clear').removeClass('dirty');
  }
}

function authenticate() {
  // Uncomment when deployed to waywire.com domain
  //var mvp_session = document.cookie.match(/mvp_session=\w+/)[0];
  //var sessionId = mvp_session.replace('mvp_session=','');
  var sessionId = '9eea613f3d7acca493702b7dc066e132';
  $.ajax({
    url: 'http://waywire.com/_check_session?sess_id='+sessionId,
    type: 'GET',
    success: function(response) {
      if (response.status != 200) {
        window.location = 'http://waywire.com/login';
      } 
    }
  });
}
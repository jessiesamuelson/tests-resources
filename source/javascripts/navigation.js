$(function() {
  detectSection();
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
  if (anchor === '') {  
    toggleSection($('.all-channels'));
  } else {
    toggleSection($("a[href='"+anchor+"']"));
  }
}

function clearResultButton() {
  if ($('.search-channels .results').children().length > 0) {
    $('.search-channels .clear').addClass('dirty');
  } else {
    $('.search-channels .clear').removeClass('dirty');
  }     
}
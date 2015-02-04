$(function() {
  $('.channels nav .curator-video').click(openVideoModal);
  $('.curator-video form').submit(getCuratorVideo);
});

function getCuratorVideo(e) {
  e.preventDefault();

  var showmakerUrlInput = $('.curator-video input[name="showmaker_url"]'),
      showmakerUrl = showmakerUrlInput.val();

  $.ajax({
    url: baseUrl+'/curator-video?url='+showmakerUrl+'.json',
    method: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Token token='+apiKey
    },    
    success: function(data) {
      $('.curator-video .mp4').html(data);
    },
    error: function(data) {
      console.log(data)
    }
  });

  showmakerUrlInput.val('');
}


function openVideoModal(e) {
  e.preventDefault();
  $('.curator-video.modal').addClass('active');
  $('.curator-video.modal .fa-times').click(closeModal);
}

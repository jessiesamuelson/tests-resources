$(function() {
  $('.curator-video form').submit(getCuratorVideo);
});

function getCuratorVideo(e) {
  e.preventDefault();

  var showmakerUrlInput = $('.curator-video input[name="showmaker_url"]'),
      showmakerUrl = showmakerUrlInput.val();

  $.ajax({
    url: baseUrl+'/api/curator-video?url='+showmakerUrl+'',
    method: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Token token='+apiKey
    },    
    success: function(data) {
      $('#new-channel input[name="curator_video"]').val(data);
    },
    error: function(data) {
      console.log(data)
    }
  });

  showmakerUrlInput.val('');
}

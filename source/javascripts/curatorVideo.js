$(function() {
  $('.curator-video form').submit(getCuratorVideo);
});

function getCuratorVideo(e) {
  e.preventDefault();

  var showmakerUrlInput = $('.curator-video input[name="showmaker_url"]'),
      showmakerUrl = showmakerUrlInput.val();

  $.ajax({
    url: 'http://channel-api.herokuapp.com/api/curator-video?url='+showmakerUrl+'',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      $('#new-channel input[name="curator_video"]').val(data);
    },
    error: function(data) {
      console.log(data)
    }
  });

  showmakerUrlInput.val('');
}

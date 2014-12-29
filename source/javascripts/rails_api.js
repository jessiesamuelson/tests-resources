window.RailsApi = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var channelRouter = new RailsApi.Routers.Channels();
    Backbone.history.start({});
  }
};

window.baseUrl = '/api';

$(document).ready(function(){
  RailsApi.initialize();
});

/* Helper functions */
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
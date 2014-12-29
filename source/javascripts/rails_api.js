window.RailsApi = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('backbone app init')
    var channelRouter = new RailsApi.Routers.Channels();
    Backbone.history.start({});
  }
};

window.baseUrl = 'http://waywire-channels.herokuapp.com/api';

$(document).ready(function(){
  RailsApi.initialize();
});

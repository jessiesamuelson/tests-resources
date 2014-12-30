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

window.baseUrl = 'http://waywire.com.nessa.dev.magnify.net/admin/services/waywiremanager';
//'http://waywire-channels.herokuapp.com/api';

$(document).ready(function(){
  RailsApi.initialize();
});

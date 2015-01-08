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

window.baseUrl = 'http://waywire.com.nessa.dev.magnify.net/admin/services/waywiremanager/api';
 // Production 'http://waywire.com/admin/services/waywiremanager';

$(document).ready(function() {
  RailsApi.initialize();
});

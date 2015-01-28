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

window.baseUrl = 'http://staging.waywire.com:3001/api';
 // Production 'http://waywire.com/admin/services/waywiremanager';
window.apiKey = 'da388efde809cb227c3d43ab2f170e5a';
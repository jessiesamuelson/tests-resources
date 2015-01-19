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
window.apiKey = '798b6e1e7325d9de44a2a4410a0ba3b4';
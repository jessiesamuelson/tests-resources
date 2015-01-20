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
window.apiKey = '2c4fb4dce435b633c5ae1bb38b3cd678'; // Key from staging.waywire.com:3001
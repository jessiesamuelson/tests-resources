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

window.baseUrl = 'http://waywire.com:3001/api';
  // Heroku 'http://channel-api.herokuapp.com/api'
 // Production 'http://waywire.com/admin/services/waywiremanager';
window.apiKey = 'ab7562df9a8dc1f7fd3f9462b30ba65f'; 
// Key from staging.waywire.com:3001

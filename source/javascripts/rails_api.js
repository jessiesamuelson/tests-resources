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
  // Heroku 'http://channel-api.herokuapp.com/api'
 // Production 'http://waywire.com/admin/services/waywiremanager';
window.apiKey = 'ee6d1a41ad50080aa019380f61d1fe5f'; 
// Key from staging.waywire.com:3001
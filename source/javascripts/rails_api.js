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
 // Staging 'http://staging.waywire.com:3001/api';
window.apiKey = 'da388efde809cb227c3d43ab2f170e5a'
// Staging: 'ab7562df9a8dc1f7fd3f9462b30ba65f'; 

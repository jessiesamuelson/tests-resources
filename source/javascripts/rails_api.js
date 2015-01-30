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

window.baseUrl = 'http://'+window.location.hostname+':3001/api';
window.apiKey;

var keys = {
  staging: 'da388efde809cb227c3d43ab2f170e5a',
  dev: 'a67c31bc8ce25b2906f20108dee41766',
  production: 'ea2c98f3ef6344164fc1ba7d0b7b89cc'
};

if (baseUrl.indexOf('staging') > -1) {
  window.apiKey = keys.staging;
} else if (baseUrl.indexOf('nessa.dev') > -1 || baseUrl.indexOf('localhost') > -1) {
  window.apiKey = keys.staging;
  window.baseUrl = 'http://staging.waywire.com:3001/api';
} else {
  window.apiKey = keys.production;
}
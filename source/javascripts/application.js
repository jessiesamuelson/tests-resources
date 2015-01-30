//= require ./library/jquery-1.11.2.min
//= require ./library/underscore
//= require ./library/backbone
//= require_tree ./templates
//= require rails_api
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .

//$.getScript('javascripts/library/jquery-1.11.2.min.js', function() {});
// $.getScript('javascripts/library/underscore.js', function() {});
// $.getScript('javascripts/library/backbone.js', function() {});
// //$.getScript('javascripts/templates/channel_index.jst.ejs', function() {})
// $.getScript('javascripts/rails_api.js', function() {});
// $.getScript('javascripts/models/channel.js', function() {});
// $.getScript('javascripts/models/category.js', function() {});
// $.getScript('javascripts/collections/channels.js', function() {});
// $.getScript('javascripts/views/channels/channels_index.js', function() {});
// $.getScript('javascripts/routers/channels_router.js', function() {});
// $.getScript('javascripts/curatorVideo.js', function() {});
// $.getScript('javascripts/helpers.js', function() {})
// $.getScript('javascripts/navigation.js', function() {});
// $.getScript('javascripts/paginate.js', function() {});

$(function() {
  RailsApi.initialize();

  //authenticate();
  detectSection();
  $(window).on('popstate', detectSection);
  clearResultButton();

  $('.channels nav a').click(function(e) {
    toggleSection($(e.target));
  });

});

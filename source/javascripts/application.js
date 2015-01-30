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

$(function() {
  RailsApi.initialize();
  // Uncomment when deployed to waywire.com domain
  //authenticate();
  detectSection();
  $(window).on('popstate', detectSection);
  clearResultButton();

  $('.channels nav a').click(function(e) {
    toggleSection($(e.target));
  });

});

RailsApi.Models.Channel = Backbone.Model.extend({
  idAttribute: "id",
  defaults: {
    desc: 'No description.',
    keywords: 'waywire,fantastic', 
    mobile_banner: 'None', 
    twitter_widget_id: 'None', 
    curator_img: 'None', 
    curator_name: 'J Doe',
    curator_desc: 'None'
  }
});

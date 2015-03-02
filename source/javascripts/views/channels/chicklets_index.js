RailsApi.Views.ChickletView = Backbone.View.extend({
  tagName: 'li',
  template: _.template("<img src=\'<%= src %>\' data-id=\'<%- id %>\' data-sort=\'<%- sort_order %>\' class=\'chicklet\'/>"), 

  initialize: function() {
    //this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var channel = this.template(this.model.attributes);
    this.$el.append(channel);
    return this;
  }

});


RailsApi.Views.ChickletListView = Backbone.View.extend({
  initialize: function() {
    //this.listenTo(this.collection, 'all', this.render);
  },

  render: function() {
    var that = this;
    this.$el.empty();

    _.each(this.collection.models, function(channel) {
      var chickletView = new RailsApi.Views.ChickletView({model: channel});
      that.$el.append(chickletView.render().el);
    });
    
    this.$el.sortable();     
  }

});

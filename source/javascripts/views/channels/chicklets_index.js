RailsApi.Views.ChickletView = Backbone.View.extend({
  tagName: 'li',
  template: _.template("<div class=\'channel\'><img src=\'<%= src %>\' data-id=\'<%- id %>\' alt=\'<%- name %>\' data-sort=\'<%- sort_order %>\' class=\'chicklet\'/><form class='order-form'>Order <span class=\'order\'><%- sort_order %></span>  <span class=\'edit\'><i class=\'fa fa-minus\'></i></span></form></div>"), 

  initialize: function() {
    //this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .edit': 'changeOrder',
    'submit .order-form': 'saveOrder',
    'click .save': 'saveOrder'
  },

  render: function() {
    var channel = this.template(this.model.attributes);
    this.$el.append(channel);
    return this;
  },

  changeOrder: function() {
    var orderEl = this.$el.find('.order'),
        order  = orderEl.html();
        orderInput = $('<input>').val(order).attr('placeholder', order);  
    
    orderEl = orderEl.empty().append(orderInput);
    var editEl = this.$el.find('.edit');
    editEl.html('').removeClass('edit').append('<i class="fa fa-check"></i>').addClass('save');
  },

  saveOrder: function() {
    var that = this;
    var currentOrder = this.$el.find('.order input').attr('placeholder'),
        newOrder = this.$el.find('.order input').val();
    if (newOrder != currentOrder) {
      var channel = this.model;
      channel.set({sort_order: newOrder});
      channel.url = baseUrl + '/channels/' + channel.id;
      channel.save(null, {
        success: function() {
          notify('Successfully update chicklet order.', 'success');
          that.changeOrderSuccess();
          $('.sort-channels .refresh').trigger('click');
          // a hack to sort collection and render view
        }  
      }, {
        error: function(data) { }  
      });        
    } else {
      this.changeOrderSuccess();
    }    
  },

  changeOrderSuccess: function() {
    this.$el.find('.order').html(this.model.attributes.sort_order);
    this.$el.find('.save').html("<i class='fa fa-minus'></i>")
            .removeClass('save').addClass('edit');
  }

});


RailsApi.Views.ChickletListView = Backbone.View.extend({
  initialize: function() {
    //this.listenTo(this.collection, 'change', this.render);
    var that = this;
    $('.sort-channels .refresh').click(function(e) {
      e.preventDefault();
      that.collection.sort();
      that.render();
    });
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

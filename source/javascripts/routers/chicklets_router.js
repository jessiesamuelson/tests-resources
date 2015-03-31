RailsApi.Routers.Chicklets = Backbone.Router.extend({
  initialize: function() {
    this.authenticateApi();
    this.fetchChannels('.sort-channels .channel-list', baseUrl+'/channels?pagination=false', '.sort-channels .pagination');
  },

  fetchChannels: function(el, url, paginationDiv) {
    var that = this;
    loading($('.sort-channels'));

    this.channels = new RailsApi.Collections.Channels();
    this.channels.comparator = 'sort_order';
    this.chickletListView = new RailsApi.Views.ChickletListView({
      collection: this.channels,
      el: $(el)
    });

    this.channels.url = url; 
    this.channels.fetch().done(function(data) {
      doneLoading($('.sort-channels'));
      if (typeof(data.channels) === 'undefined' || data.channels.length === 0) {
        notify('Cannot fetch channels.', 'error');
      } else {
        that.channels.sort();      
        // that.pagination = new Pagination(paginationDiv, data.pagination);     
        // that.changePage(); 
        that.chickletListView.render();
        $('section.sort-channels .save').click(function(e) {
          e.preventDefault();
          that.updateOrder();
        });
      }
    });
  },

  authenticateApi: function() {
    $.ajaxSetup({
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token token='+apiKey,
        'Cache-Control': 'no-cache'
      }
    });
  },

  changePage: function() {
    var that = this;
    this.pagination.$el.click(function(e) {
      var pageNum = that.pagination.change($(e.target));

      if (pageNum != undefined) {
        that.channels.url = updateUrl(that.channels.url, pageNum);
        that.channels.fetch({
          success: function() {
            that.pagination.doneLoading();
            that.chickletListView.render();
          }
        });
      }
    });
  },

  updateOrder: function() {
    var that = this;   
    //var offset = (that.pagination.page - 1) * that.pagination.perPage;
    var orderChange = 0,
        updateSuccess = 0;
    loading($('.sort-channels'));
    
    _.each($('.chicklet'), function(chicklet) {
      var currentOrder = parseInt($(chicklet).attr('data-sort')),
          newOrder = $('.chicklet').index(chicklet) + 1,
          id = parseInt($(chicklet).attr('data-id'));     

      if (newOrder != currentOrder) {
        orderChange += 1;
        var channel = that.channels.where({id: id})[0];
        channel.set({sort_order: newOrder});
        channel.url = baseUrl + '/channels/' + id;
        channel.save(null, {
          success: function() {
            updateSuccess += 1;
            if (orderChange === updateSuccess) {
              notify('Successfully update chicklet order.', 'success');
              that.channels.sort();
              that.chickletListView.render();
              doneLoading($('.sort-channels'));
            }            
          }  
        }, {
          error: function(data) { }  
        });        
      }
    });
  }

});

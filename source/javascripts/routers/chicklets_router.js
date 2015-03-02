RailsApi.Routers.Chicklets = Backbone.Router.extend({
  initialize: function() {
    this.authenticateApi();
    this.fetchChannels('.sort-channels .channel-list', baseUrl+'/channels', '.sort-channels .pagination');
  },

  fetchChannels: function(el, url, paginationDiv) {
    var that = this;
    this.channels = new RailsApi.Collections.Channels();
    this.chickletListView = new RailsApi.Views.ChickletListView({
      collection: this.channels,
      el: $(el)
    });

    this.channels.url = url; 
    this.channels.fetch().done(function(data) {
      console.log(data)
      if (typeof(data.channels) === 'undefined') {
        notify(data.msg, 'error');
      } else if (data.channels.length === 0) {
        notify('No channel found.', 'error');
      } else {
        that.pagination = new Pagination(paginationDiv, data.pagination);
        that.changePage(); 
        that.chickletListView.render();
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
          }
        });
      }
    });
  }

});

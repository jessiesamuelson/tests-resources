RailsApi.Routers.Channels = Backbone.Router.extend({
  routes: {
    'new': 'addChannel',
    'search': 'searchChannels'
  },

  initialize: function() {
    this.authenticateApi();
    this.fetchChannels('.all-channels .channel-list', baseUrl+'/channels', '.all-channels .pagination');
  },

  fetchChannels: function(el, url, paginationDiv) {
    var that = this;
    this.channels = new RailsApi.Collections.Channels();
    this.channelListView = new RailsApi.Views.ChannelListView({
      collection: this.channels,
      el: $(el)
    });

    this.channels.url = url; 
    this.channels.fetch().done(function(data) {
      clearResultButton();
      if (typeof(data.channels === undefined)) {
        notify(data.msg, 'error')
      }
      else if (data.channels.length === 0) {
        notify('No channel found.', 'error')
      } else {
        that.pagination = new Pagination(paginationDiv, data.pagination);
        that.changePage(); 
        that.channelListView.render();
      }
    });
  },

  authenticateApi: function() {
    $.ajaxSetup({
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token token='+apiKey
      }
    });
  },

  addChannel: function() {
    var that = this;

    $('#new-channel').submit(function(e) {
      e.preventDefault();
      var name = $('input[name="name"]').val(),
          src = $('input[name="src"]').val(),
          href = $('input[name="href"]').val(),
          categoryArray = $('input[name="category_array"]').val().toLowerCase().split(','),
          desc = $('input[name="desc"]').val(),
          keywords = $(this.el).find('input[name="keywords"]').val(),
          twitter_widget_id = $('input[name="twitter_widget_id"]').val(),
          community_site_id = $('input[name="community_site_id"]').val(),
          banner_img = $('input[name="banner_img"]').val(),
          mobile_banner = $('input[name="mobile_banner"]').val(),
          curator_name = $('input[name="curator_name"]').val(),
          curator_img = $('input[name="curator_img"]').val(),
          curator_video = $('input[name="curator_video"]').val(),
          curator_desc = $('input[name="curator_desc"]').val();

      var newChannel = new RailsApi.Models.Channel({
        name: name, src: src,
        href: href, category_array: categoryArray,
        desc: desc, keywords: keywords,
        twitter_widget_id: twitter_widget_id,
        banner_img: banner_img, mobile_banner: mobile_banner,
        curator_name: curator_name, curator_img: curator_img,
        curator_video: curator_video, curator_desc: curator_desc
      });

      newChannel.url = baseUrl+'/channels';
      newChannel.save(null, {
        success: function(data) {
          notify(data.attributes.msg, 'success'); }
      }, {
        error: function(data) {
          notify(data.attributes.msg, 'error'); }
      });

      that.channels.fetch();
      $('#new-channel').find('input[type="text"]').val('');
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
  },

  searchChannels: function() {
    var that = this;

    $('#search-channels').submit(function(e) {
      e.preventDefault();
      var searchTerm = $(this).find('input[name="term"]').val(),
          resultDiv = '.search-channels .channel-list',
          paginationDiv = '.search-channels .pagination',
          url;

      if (searchTerm.indexOf('category:') > -1) {
        var categories = searchTerm.replace('category:','');
        url = baseUrl+'/channels?category='+categories;
        that.fetchChannels(resultDiv, url, paginationDiv);
      } else {
        url = baseUrl+'/channels?term='+searchTerm;
        that.fetchChannels(resultDiv, url, paginationDiv);
      }

      that.clearSearch();
    });
  },

  clearSearch: function() {
    var clear = function() {
      $('#search-channels input[type="text"]').val('');
      $('.search-channels').find('.channel-list').empty();
      $('.search-channels').find('.pagination').empty();
      $('.search-channels').find('.clear').removeClass('dirty');
    }

    $('.search-channels .clear').click(clear);
    $('.channels nav').click(clear);
  }

});

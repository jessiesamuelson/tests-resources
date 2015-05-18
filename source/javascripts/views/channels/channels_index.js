RailsApi.Views.ChannelView = Backbone.View.extend({
  tagName: 'li',
  template: _.template("<h4 class=\'name\'> <span class=\'value\'> <%= name %> <\/span> (Id: <%= id %>)<\/h4> <p class=\'href\'> <label>Link:<\/label> <span class=\'value\'> <%= href %> <\/span> <\/p> <p class='src'> <label>Chicklet:<\/label> <span class=\'value\'> <%= src %> <\/span> <\/p> <p class='image_large'> <label>Image large:<\/label> <span class=\'value\'> <%= image_large %> <\/span> <\/p> <p class=\'category_array\'> <label>Categories:<\/label> <span class=\'value\'> <%= category_array %> <\/span> <\/p> <p class=\'sort_order\'> <label>Sort order:<\/label> <span class=\'value\'> <%= sort_order %> <\/span> <\/p> <div class=\'more\'> <span class=\'details\'>Details<\/span> <span class=\'curator\'>Curator info<\/span> <\/div> <div class=\'details\'> <p class=\'desc\'> <label>Description:<\/label> <span class=\'value\'> <%= desc %> <\/span> <\/p> <p class=\'keywords\'> <label> Keywords:<\/label> <span class=\'value\'> <%= keywords %> <\/p> <p class=\'mobile_banner\'> <label>Mobile banner:</label> <span class=\'value\'> <%= mobile_banner %> <\/span> <\/p> <p class=\'banner_img\'> <label>Channel banner:<\/label> <span class=\'value\'> <%= banner_img %> <\/span> <\/p> <p class=\'twitter_widget_id\'> <label>Twitter widget id:<\/label> <span class=\'value\'> <%= twitter_widget_id %> <\/span> <\/p> <\/div> <div class=\'curator\'> <p class=\'curator_img\'> <label>Curator image:<\/label> <span class=\'value\'> <%= curator_img %> <\/span> <\/p> <p class=\'curator_name\'> <label>Curator name:<\/label> <span class=\'value\'> <%= curator_name %> <\/span> <\/p> <p class=\'curator_desc\'> <label>Curator description:<\/label> <span class=\'value\'> <%= curator_desc %> <\/span> <\/p> <p class=\'curator_video\'> <label>Curator video:<\/label> <span class=\'value\'> <%= curator_video %> <\/span> <\/p> <\/div> <button class=\'edit-channel\' data=\'<%- id %>\'>Edit<\/button> <button class=\'delete-channel\' data=\'<%- id %>\'>Delete<\/button>"), 

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    var channel = this.template(this.model.attributes);
    this.$el.append(channel);
    return this;
  },

  events: {
    'click .edit-channel': 'showEditForm',
    'click .delete-channel': 'deleteChannel',
    'click .save-channel': 'updateChannel',
    //'submit .edit-form': 'updateChannel',
    'click .cancel': 'cancelUpdate',
    'click .more span': 'toggleDetails',
  },

  deleteChannel: function() {
    var that = this;
    openModal('.channels .general.modal', 'Are you sure you want to delete this channel?');

    _.extend($('.channels .general.modal .confirm'), Backbone.Events);
    $('.channels .general.modal .confirm').click(function() {
      closeModal();
      that.model.url = baseUrl+'/channels/'+that.model.id;
      that.model.destroy({
        success: function(model, response) {
          notify(response.msg, 'success'); }
      }, {
        error: function(model, response) {
          notify(response.msg, 'error'); }
      });
    });
  },

  showEditForm: function(e) {
    e.preventDefault();

    var name = $(this.el).find('.name'),
        src = $(this.el).find('.src'),
        image_large = $(this.el).find('.image_large'),
        href = $(this.el).find('.href'),
        category_array = $(this.el).find('.category_array'),
        sort_order = $(this.el).find('.sort_order'),
        desc = $(this.el).find('.desc'),
        keywords = $(this.el).find('.keywords'),
        mobile_banner = $(this.el).find('.banner_img'),
        banner_img = $(this.el).find('.mobile_banner'),
        twitter_widget_id = $(this.el).find('.twitter_widget_id'),
        curator_img = $(this.el).find('.curator_img'),
        curator_name = $(this.el).find('.curator_name'),
        curator_desc = $(this.el).find('.curator_desc'),
        curator_video = $(this.el).find('.curator_video'),
        editButton = $(this.el).find('.edit-channel'),
        deleteButton = $(this.el).find('.delete-channel'),
        fields = [];
    fields.push(name, src, image_large, href, category_array, sort_order, desc,
      keywords, mobile_banner, banner_img, twitter_widget_id,
      curator_name, curator_img, curator_desc, curator_video);

    _.each(fields, function(field) {
      $(field).replaceWith(function() {
        var fieldValue = $(this).find('.value').html(),
            fieldLabel = $(this).find('label'),
            fieldName = $(this).attr('class'),
            input = $('<input type="text">'),
            div = $('<div>');
        input.addClass(fieldName).val($.trim(fieldValue));
        if (fieldName === 'name') {
          fieldLabel = $('<label>').html('Name:');
        }
        div.append(fieldLabel).append(input);
        return div;
      });
    });

    editButton.html('Save').attr('class', 'save-channel');
    deleteButton.html('Cancel').attr('class', 'cancel');
    $(this.el).wrapInner($('<form>').addClass('edit-form'));
    this.showMore();
  },

  updateChannel: function(e) {
    e.preventDefault();
    var name = $(this.el).find('.name').val(),
        src = $(this.el).find('.src').val(),
        image_large = $(this.el).find('.image_large').val(),
        href = $(this.el).find('.href').val(),
        category_array = $(this.el).find('.category_array').val().toLowerCase(),
        sort_order = $(this.el).find('.sort_order').val(),
        desc = escapeHtml($(this.el).find('.desc').val()),
        keywords = $(this.el).find('.keywords').val(),
        twitter_widget_id = $(this.el).find('.twitter_widget_id').val(),
        mobile_banner = $(this.el).find('.mobile_banner').val(),
        banner_img = $(this.el).find('.banner_img').val(),
        curator_name = $(this.el).find('.curator_name').val(),
        curator_img = $(this.el).find('.curator_img').val(),
        curator_desc = escapeHtml($(this.el).find('.curator_desc').val()),
        curator_video = $(this.el).find('.curator_video').val(),
        id = $(this.el).find('.save-channel').attr('data');
    if (sort_order !== '') { 
      sort_order = parseInt(sort_order); 
    } 
    var channelObj = {
      name: name, src: src,
      href: href, category_array: category_array,
      sort_order: sort_order, desc: desc, keywords: keywords,
      mobile_banner: mobile_banner, banner_img: banner_img,
      twitter_widget_id: twitter_widget_id,
      curator_name: curator_name, curator_img: curator_img,
      curator_desc: curator_desc, curator_video: curator_video
    };
    
    this.model.set(channelObj);
    this.model.url = baseUrl+'/channels/'+id;
    this.model.save(null, {
      success: function(data) {
        notify(data.attributes.msg, 'success'); }
    }, {
      error: function(data) {
        notify(data.attributes.msg, 'error'); }
    });
  },

  cancelUpdate: function(e) {
    e.preventDefault();
    this.$el.empty();
    this.render();
  },

  toggleDetails: function(e) {
    var className = $(e.target).attr('class');
    $(e.target).parent().parent().find('div.'+className).toggleClass('active');
  },

  showMore: function() {
    this.$el.find('div.details').addClass('active');
    this.$el.find('div.curator').addClass('active');
  }

});


RailsApi.Views.ChannelListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'all', this.render);
  },

  render: function() {
    var that = this;
    this.$el.empty();

    _.each(this.collection.models, function(channel) {
      var channelView = new RailsApi.Views.ChannelView({model: channel});
      that.$el.append(channelView.render().el);
    });
  }

});

RailsApi.Collections.Channels=Backbone.Collection.extend({model:RailsApi.Models.Channel,url:"/channels",parse:function(n){return n.channels}});
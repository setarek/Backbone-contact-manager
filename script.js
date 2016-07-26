$(function(){
    //--------------
    // Models
    //--------------
    var Contact = Backbone.Model.extend({
      defaults: {
        name: '',
        number: '',
        address: '',
        img: 'http://mehrnooshdashti.com/def.jpg'
      }
    })
    //--------------
    // Collection
    //--------------
    var ContactList = Backbone.Collection.extend({
      model: Contact,
      localStorage: new Store("backbone-ContactList")
    })
    var ContactList = new ContactList
    //--------------
    // View
    //--------------
    var appview = Backbone.View.extend({
      el: '#main',
      initialize: function(){
        this.render();
      },
      render : function(){
         this.$el.html('kofte')
      }
    })
    var appView = new appview();
})

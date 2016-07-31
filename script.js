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
    var CreateContact = Backbone.View.extend({
      tagName: 'li',
      template: _.template($('#contact-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()))
        return this
      }
    })
    var appview = Backbone.View.extend({
      el: '#main',
      initialize: function(){
        this.input = this.$('#NewContact')
      },
      events: {
        'keypress #NewContact': 'createTodoOnEnter'
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) {
          return
        }
        ContactList.create(this.newAttributes())
        this.input.val('')
      },
      newAttributes: function(){
        return {
          name: this.input.val().trim(),
        }
      }
    })
    var appView = new appview()
})

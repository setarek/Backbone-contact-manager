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
      model: Contact
    })

    var contactList = new ContactList([
      {
        name: 'Mehrnoosh',
        number: '00000000000'
      }, {
        name: 'Mahdi',
        number: '00000000000'
      }
    ])
    //--------------
    // View
    //--------------
    var ContactView = Backbone.View.extend({
      tagName: 'li',
      template: _.template($('#contact-template').html()),

      initialize () {
        this.model.on('change', this.render.bind(this))
        this.render()
      },

      render () {
        this.$el.html(this.template(this.model.toJSON()))
        return this
      }
    })

    var ContactListView = Backbone.View.extend({
      template: _.template($('#contact-list').html()),
      initialize ({ model }) {
        this.model = model
        this.model.on('reset', this.addAll.bind(this))
        this.model.on('add', this.addOne.bind(this))
        // this.model.fetch()
        this.render()
      },

      render () {
        this.el.innerHTML = this.template()
        this.addAll()
        return this
      },

      addOne (model) {
        this.$el.find('#contact').append(new ContactView({
          model: model
        }).$el)
      },

      addAll (model) {
        this.$el.find('#contact').html('')
        this.model.each((model) => {
          this.addOne(model)
        })
      }
    })

    var AppView = Backbone.View.extend({
      el: '#contact-wrapper',
      template: _.template($('#main-template').html()),
      events: {
        'keypress #new-contact': 'createTodoOnEnter'
      },

      initialize () {
        this.render()
        return this
      },

      createTodoOnEnter (e) {
        if ( e.which === 13 && this.input.val().trim().length > 0 ) {
          contactList.add({
            name: this.input.val().trim()
          })
          this.input.val('')
        }
      },

      render () {
        this.$el.html(this.template())
        this.$el.find('#main').html(new ContactListView({
          model: contactList
        }).$el)

        this.input = this.$el.find('#new-contact')
      }
    })

    var appView = new AppView()
})

var app = app || {};

app.TodoView = Backbone.View.extend({

  tagName: 'li',

  template: _.template( $('#item-template').html() ),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'togglecompleted', // NEW
    'click .destroy': 'clear' // NEW
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);

    this.listenTo(this.model, 'destroy', this.remove);//view’s inherited method: View.remove()
    this.listenTo(this.model, 'visible', this.toggleVisible); // NEW
  },

  render: function() {
    //render html content
    this.$el.html( this.template( this.model.toJSON() ) );
    //declare reference
    this.$input = this.$('.edit');
    //toggle function
    this.$el.toggleClass( 'completed', this.model.get('completed') );
    this.toggleVisible();
    return this;
  },

  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  toggleVisible: function() {
    this.$el.toggleClass( 'hidden', this.isHidden());
  },

  isHidden: function(){
    var isCompleted = this.model.get('completed');
    return ( (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active') );
  },

  togglecompleted: function() {
    this.model.toggle();
  },

  clear: function() {
    this.model.destroy();
  },

  close: function() {
    var value = this.$input.val().trim();

    if(value) {
      this.model.save({title: value});

    }else {
      this.clear(); // NEW
    }

    this.$el.removeClass('editing');

  },

  updateOnEnter: function(e) {
    if(e.which === ENTER_KEY) {
      this.close();
    }
  }


});

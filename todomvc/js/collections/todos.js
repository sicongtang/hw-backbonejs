var app = app || {};

var TodoList = Backbone.Collection.extend({

  model: app.Todo,

  localStorage: new Backbone.LocalStorage('hw-backbone-todomvc-localstorage'),

	//return completed list of todos
  completed: function() {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  },

	//return remaining list of todos
  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  nextOrder: function() {
    if(!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function(todo) {
    return todo.get('order');
  }

});


app.Todos = new TodoList();

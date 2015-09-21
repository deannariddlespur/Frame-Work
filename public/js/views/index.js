var ListView = Backbone.View.extend({
    el: $('#item-list'), // el attaches to existing element
    // `events`: Where DOM events are bound to View methods. Backbone doesn't have a separate controller to handle such bindings; it all happens in a View.
    events: {
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem'); // every function that uses 'this' as the current object should be in here

      this.counter = 0; // total number of items added thus far
      this.render();
    },
    // `render()` now introduces a button to add a new list item.
    render: function(){
      $(this.el).append("<button id='add' class='btn btn-primary'>Click me</button>");
      $(this.el).append("<ul class='list-group list-style'></ul>");
    },
    // `addItem()`: Custom function called via `click` event above.
    addItem: function(){
      this.counter++;
      $('ul', this.el).append("<li class='list-group-item'>You click "+this.counter+" times</li>");
    }
  });

  var listView = new ListView();

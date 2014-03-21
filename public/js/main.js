//var Test = new Class();
//Test.include({
//  x: '900',
//  y: '900'
//});
//
//var test1 = new Test();
//var test2 = new Test();
//console.log(test1.x);
//console.log(test2.x);
//test1.x = '800';
//console.log(test1.x);
//console.log(test2.x);
//exit;

var HyperElement = new Class();
HyperElement.extend({
  cur_op_mode: 'insert', // insert, select
  selected: null // Selected HyperElement
});
HyperElement.include({
  //self: null, // HyperElement instance
  $$: null, // jQuery Object
  parent: null, // parent HyperElement instance
  html: '<div></div>',
  style: {
    padding: '10px',
    border: '1px solid #000',
    background: '#300',
    'min-height': '40px'
  },

  init: function(){
    //this.self = this;
  },
  activate: function(parent){
    if ( typeof parent != 'undefined') {
      this.parent = parent;
    }
    
    this.$$ = $(this.html);
    this.$$.css(this.style);
    if ( this.parent != null ) {
      //console.log('parent.$$', this.parent.$$);
      //console.log('$$', this.$$);
      this.parent.$$.append(this.$$);
    } else {
      $('#root').append(this.$$);
    }

    // Events
    for ( var event in this.events ) {
      this.$$.bind(event, {context: this}, this.events[event]);
    }

  },
  test: 'aaa',
  events: {
    click: function(event){
      if ( HyperElement.cur_op_mode == 'insert') {
        var hyperElement = new HyperElement();
        hyperElement.html = '<ul></ul>';
        hyperElement.style.background = '#fff';
        hyperElement.activate(event.data.context);
      } else if ( HyperElement.cur_op_mode == 'select' ) {
        console.log(event.data.context.$$)
        HyperElement.selected = event.data.context;
        $('#root *').each(function(){
          $(this).removeClass('hl-selected');
        });
        event.data.context.$$.addClass('hl-selected');
      }

      // leave the event bubbling chain
      return false;
    },
    mouseover: function(event) {
    },
    mouseout: function(event) {
    }
  },
  //create: function(){
  //}

});

//(function($){
//  var hyperElement = new HyperElement();
//  $.fn.hyperLayout = hyperElement.activate;
//})(jQuery);

//  (function($){
//    var cur_op_mode = 'insert'; // insert, select
//    
//    $.fn.hyperLayout = function(custom_options) {
//      var $$ = $(this);
//      var element = new Element();
//      var options = {
//        element_class: 'default'
//      };
//      $.extend(options, custom_options);
//      var offset = $(this).offset();
//  
//      // Events
//      for ( var event in element.events ) {
//        $$.bind(event, element.events[event]);
//        alert(element.events[event]);
//      }
//      //$(this).click(function(e) {
//      //  if ( cur_op_mode == 'insert' ) {
//      //    console.log('insert');
//      //    console.log(pos(e).x, pos(e).y);
//      //    var prop = { background: '#666'};
//      //    create(this, prop);
//      //    return false;
//      //  }
//      //});
//  
//      // methods
//      var pos = function(/* event=*/ e) {
//        return {
//          x: e.pageX - offset.left,
//          y: e.pageY - offset.top
//        };
//      };
//      var create = function(context, prop) {
//        var $layout = $('<div class="' + options.element_class + '"></div>');
//        $layout.css(prop);
//        $(context).append($layout);
//      };
//    }
//  })(jQuery);

// on ready
$(function(){
  //$('#hyper-layout').hyperLayout.activate();
  //$('#hyper-layout').hyperLayout();

  //var root = new HyperElement();
  //console.log(root);

  var hyperElement = new HyperElement();
  hyperElement.activate();

  $('#btn-insert').click(function(){
    HyperElement.cur_op_mode = 'insert';
    alert(HyperElement.cur_op_mode)
  });
  $('#btn-select').click(function(){
    HyperElement.cur_op_mode = 'select';
    alert(HyperElement.cur_op_mode)
  });

  //console.log(hyperElement);

});

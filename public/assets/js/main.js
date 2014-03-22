
var HyperElement = new Class();
HyperElement.extend({
  cur_op_mode: 'insert', // insert, select
  selected: null // Selected HyperElement
});
HyperElement.include({
  //self: null, // HyperElement instance
  $$: null, // jQuery Object
  parent: null, // parent HyperElement instance
  children: [], // children HyperElement instances
  /*
  html: '<div></div>',
  class_name: null,
  style: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #000',
    background: '#fff',
    'min-height': '40px'
  },
  */
  html: null,
  class_name: null,
  style: null,

  init: function(parent, custom_options){
    if ( typeof parent != 'undefined' && parent != null ) {
      this.parent = parent;
      this.parent.children.push(this);
    }

    var options = {
      html: '<div></div>',
      class_name: null,
      style: {
        margin: '10px',
        padding: '10px',
        border: '1px solid #000',
        background: '#fff',
        'min-height': '40px'
      }
    };
    $.extend(true, options, custom_options);
    console.log(options);
    this.html = options.html;
    this.class_name = options.class_name;
    this.style = options.style;
  },
  activate: function(){
    //console.log(this);
    this.$$ = $(this.html);
    this.$$.css(this.style);
    if ( this.parent != null ) {
      this.parent.$$.append(this.$$);
    } else {
      $('#root').append(this.$$);
    }

    // Events
    for ( var event in this.events ) {
      this.$$.bind(event, {context: this}, this.events[event]);
    }

  },
  updateProperties: function(properties) {
    for ( var property in properties ) {
      if ( property == 'style' ) {
        for ( var style_name in properties.style ) {
          this.style[style_name] = properties.style[style_name];
        }
      } else {
        this[property] = properties[property];
      }
    }
  },
  // このHyperElementのタイプが、
  // ページ固有であれば、そのクラス名
  // ページ内再利用可能であれば、そのクラス名
  // その親のうちはじめに出現するページ固有のクラス名＋そのクラス名
  // jQuery.selector
  getSelector: function() {
    if ( this.class_name == null ) {
      return this.$$.selector;
    } else {
      return '.' + this.class_name;
    }
  },
  printMarkup: function() {
    var style_black_list = [
      'background'
    ];


    var css_str = this.getSelector() + " {\n  ";
    for ( var style_name in this.style ) {
      css_str += style_name + ': ' + this.style[style_name] + ";\n  ";
    }
    css_str += "\n}";

    // print
    $('#meta-html').val(this.html);
    $('#meta-css').val(css_str);
  },
  test: 'aaa',
  events: {
    click: function(event){
      if ( HyperElement.cur_op_mode == 'insert') {
        var hyperElement = new HyperElement(event.data.context);
        //hyperElement.html = '<ul></ul>';
        //hyperElement.style.background = '#fff';
        hyperElement.activate(/*event.data.context*/);
      } else if ( HyperElement.cur_op_mode == 'select' ) {
        var context = event.data.context;
        HyperElement.selected = context;
        $('#root *').each(function(){
          $(this).removeClass('hl-selected');
        });
        context.$$.addClass('hl-selected');

        context.printMarkup();
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

// on ready
$(function(){

  var hyperElement = new HyperElement(null, {
    style: {
      'min-height': '200px',
      background: '#eee'
    }
  });
  hyperElement.activate(/*null, { 
    style: {
      'min-height': '200px',
      background: '#eee'
    }
  }*/);

  $('#btn-insert').click(function(){
    HyperElement.cur_op_mode = 'insert';
    $('.btn-group-op').removeAttr('disabled')
    $(this).attr({disabled: 'disabled'});
  });
  $('#btn-select').click(function(){
    HyperElement.cur_op_mode = 'select';
    $('.btn-group-op').removeAttr('disabled')
    $(this).attr({disabled: 'disabled'});
  });

});

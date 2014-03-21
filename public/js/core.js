var Class = function(parent){
  var klass = function(){
    this.init.apply(this, arguments);
  };

  // klassのプロトタイプを変更します
  if (parent) {
    var subclass = function() {};
    subclass.prototype = parent.prototype;
    klass.prototype = new subclass;
  };
  
  klass.prototype.init = function(){};

  // ショートカット
  klass.fn = klass.prototype;
  klass.fn.parent = klass;
  klass._super = klass.__proto__;

  // クラスプロパティを追加します
  klass.extend = function(obj){
    var extended = obj.extended;
    for(var i in obj){
      klass[i] = obj[i];
    }
    if (extended) extended(klass);
  };
  
  // インスタンスプロパティを追加します
  klass.include = function(obj){
    var included = obj.included;
    for(var i in obj){
      klass.fn[i] = obj[i];
    }
    if (included) included(klass);
  };
  
  return klass;
};

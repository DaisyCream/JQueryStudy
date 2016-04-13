/**
 * Created by DaisyCream on 16/4/13.
 */

(function(window, document){
    var w = window;
    var doc = document;

    var Kodo = function(selector){
        return new Kodo.prototype.init(selector);
        //由于是return init，所以需要将init的prototype改为Kodo.prototype
    };

    Kodo.prototype =  {
        constructor : Kodo,
        length : 0,
        //在原型里面加入此元素，可以让对象为类数组对象
        splice : Array.prototype.splice,
        selector : '',
        init : function(selector){
            this.selector = selector;
            this.length = selector.length;
            return document.querySelector(selector);
        },

        //hasClass : function(cls){
        //    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        //    for(var i=0;i<this.length;i++){
        //        if(this[i].className.match(reg)) return true;
        //            return false;
        //    }
        //    //以便链式调用
        //    return this;
        //},
        //
        //addClass : function(cls){
        //    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        //    for(var i=0;i< this.length;i++){
        //        if(!this[i].className.match(reg))
        //            this[i].className += ' ' + cls;
        //    }
        //    return this;
        //},
        //
        //removeClass : function(cls){
        //    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        //    for(var i=0;i<this.length;i++){
        //        if(this[i].className.match(reg))
        //            this[i].className = this[i].className.replace(cls,"");
        //    }
        //    return this;
        //},
        //
        //css : function(attr, val){
        //    console.log(this.length);
        //    for(var i=0;i<this.length;i++){
        //        if(arguments.length == 1){
        //            //getComputerStyle可以获得所有定义过的style属性不只行内style的属性
        //            return getComputedStyle(this[i], null)[attr];
        //        }
        //        this[i].style[attr] = val;
        //    }
        //    return this;
        //},

    };

    Kodo.prototype.init.prototype = Kodo.prototype;

    Kodo.ajax = function(){
        console.log(this);
    };

    w.f = Kodo;

})(window, document);
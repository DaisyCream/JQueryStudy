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
        splice : Array.prototype.splice,
        selector : '',
        init : function(selector){
            //dom选择的一些判断
        },

        hasClass : function(cls){
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for(var i=0;i<this.length;i++){
                if(this[i].className.match(reg)) return true;
            }
            return false;
        }
    };

    Kodo.prototype.init.prototype = Kodo.prototype;

    Kodo.ajax = function(){
        console.log(this);
    };

    w.f = Kodo;

})(window, document);
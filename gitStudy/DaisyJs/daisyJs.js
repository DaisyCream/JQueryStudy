/**
 * Created by DaisyCream on 16/4/13.
 */

(function(window){

    var Daisy = function(selector){
        return new Daisy.prototype.init(selector);
    };

    Daisy.prototype = {
        constructor : Daisy,
        selector : "",
        splice : Array.prototype.splice,
        length : 0,

        init : function(selector){
            this.selector = selector;
            this.length = selector.length;
            return this;
        }



    };

    Daisy.prototype.init.prototype = Daisy.prototype;


    window.$ = Daisy;
})(window);



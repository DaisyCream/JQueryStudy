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
        //针对类对象数组，可以像数组一样的输出
        splice : Array.prototype.splice,
        length : 0,

        init : function(selector){
            this.selector = selector;
            this.length = selector.length;
            return this;
        },

        /***
         * event, data, func
         */
        bind : function(){

            if(arguments.length == 1){
                //
                var events = arguments[0];

                for(var i=0;i<events.length;i++){
                    addEvent(events[i].key, events);
                }
            }else if(arguments.length == 2){
                //
                addEvent(arguments[0],arguments[1]);
            }else{
                //
                addEvent()
            }

            /***
             * 区分是IE还是其他，IE使用attachEvent
             * @param type
             * @param func
             */
            function addEvent(type, func){
                if(window.addEventListener){
                    this.addEventListener(type, func, false);
                }else if(window.attachEvent){
                    this.attachEvent('on' + type, func);
                }
            }
            return this;
        },

        unbind : function(){


        }


    };

    Daisy.prototype.init.prototype = Daisy.prototype;




    window.$ = Daisy;
})(window);



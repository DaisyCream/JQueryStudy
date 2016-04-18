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
        obj : null,

        init : function(selector){
            this.selector = selector;
            this.length = selector.length;
            this.obj = document.querySelector(selector);
            return this;
        },

        /***
         * event, data, func
         */
        bind : function(){

            if(arguments.length == 1){
                //参数只有一个时，那是对象，键值对，key是事件名称，value是callback
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
             * 区分是IE8以下用attach，IE使用attachEvent
             * @param type
             * @param func
             */
            function addEvent(type, func){
                if(window.addEventListener){
                    this.obj.addEventListener(type, func, false);
                }else if(window.attachEvent){
                    this.obj.attachEvent('on' + type, func);
                }
            }
            return this;
        },

        unbind : function(){
            if(arguments.length == 1){
                //
                var events = arguments[0];

                for(var i=0;i<events.length;i++){
                    removeEvent(events[i].key, events);
                }

            }else if(arguments.length == 2){
                //
                removeEvent(arguments[0],arguments[1]);
            }else{
                //
                removeEvent();
            }

            function removeEvent(type, func){
                if(window.removeEventListener){
                    this.obj.removeEventListener(type, func, false);
                }else if(window.detachEvent){
                    this.obj.detachEvent('on' + type, func);
                }
            }
            return this;
        },

        attr : function(attrName, attrValue){
            if(arguments.length == 1){
                return this.obj.getAttribute(attrName);
            }else{
                this.setAttribute(attrName, attrValue);
                return this;
            }
        },

        html : function(content){
            if(arguments.length == 0){
                return getInnerHtml(this.obj);
            }else {
                setInnerHtml(this.obj,content);
            }

            function getInnerHtml(element){
                return element.innerHTML;
            }

            function setInnerHtml(element, content){
                element.innerHTML = content;
            }
        },

        text : function(content){
            if(arguments.length == 0){
                return getInnerText(this.obj);
            }else {
                setInnerText(this.obj,content);
            }

            function getInnerText(element){
                return (typeof element.textContent == "string")?
                    element.textContent:element.innerText;
            }

            function setInnerText(element,content){
                if(typeof element.textContent == "string"){
                    element.content = content;
                }else{
                    element.innerText = content;
                }
            }
        },




    };

    Daisy.prototype.init.prototype = Daisy.prototype;




    window.$ = Daisy;
})(window);



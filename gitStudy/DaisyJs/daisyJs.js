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
            //当selector是对像的时候，obj就为selector
            if(typeof selector == "object"){
                this.selector = selector;
                this.length = 1;
                this.obj = selector;
            }
            else if(typeof selector == "function"){
                $(document).ready(selector);
            }
            //当传入的是string
            else if(selector.indexOf("<") != -1){
                function strToHtml(str){
                    var dom1 = document.createElement("div");
                    dom1.innerHTML = str;
                    var dom2 = dom1.childNodes[0];
                    dom1 = null;
                    return dom2;
                }
                var obj = strToHtml(selector);
                this.obj = obj;
                this.selector = obj.tagName;
                this.length = 1;
            }else { //当传入基本元素属性
                var selectors = document.querySelectorAll(selector);
                //是数组
                if(selectors.length>1){
                    this.obj = selectors;
                    this.length = selector.length;
                }else{  //为ID只是一个时
                    this.obj = document.querySelector(selector);
                    this.length = 1;
                }
                selectors = null;
                this.selector = selector;
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

        removeAttr : function(name){
            this.obj.removeAttribute(name);
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

        addClass : function(classNames){
            var reClass = this.obj.className;
            reClass +=  " " + classNames;
            this.obj.setAttribute("class", reClass);
            return this;
        },

        removeClass : function(name){
            var classList = this.obj.className.split(" ");
            for(var i =0 ;i<classList.length;i++){
                if(classList[i] == name){
                    classList[i] = "";
                }
            }
            var className = classList.join(" ");
            this.obj.setAttribute("class", className);
        },

        css : function(){
            if(arguments.length == 1){
                var cssAttr = arguments[0];
                for(var item in cssAttr){
                    this.obj.style[item] = cssAttr[item];
                }
            }else {
                this.obj.style[arguments[0]] = arguments[1];
            }

        },

        /***********************add element************************/

        append : function(tag){
            this.obj.appendChild(tag);
        },

        appendTo : function(selector){
            var tag = $(selector).obj;
            tag.appendChild(this.obj);
            tag = null;
        },


        before : function(content){
            var tag = $(content).obj;
            this.obj.insertAdjacentHTML("beforeBegin",tag.outerHTML);
            tag = null;
        },

        after : function(content){
            var tag = $(content).obj;
            this.obj.insertAdjacentHTML("afterEnd",tag.outerHTML);
            tag = null;
        },

        clone : function(bool){
            if(arguments.length == 1){
                bool = false;
            }
            return this.obj.cloneNode(bool);
        },

        replaceWith : function(content){
            console.log(this.obj.parentNode);
            this.obj.parentNode.replaceChild($(content).obj, this.obj);
        },

        replaceAll : function(selector){
            var tag = $(selector).obj;
            tag.parentNode.replaceChild(this.obj, tag);
            tag = null;
        },


        wrap : function(wrapper){
            var tag = $(wrapper).obj;
            this.obj.parentNode.appendChild(tag);
            tag.appendChild(this.obj);
        },

        wrapInner : function(wrapper){
            var tag = $(wrapper).obj;
            tag.innerHTML = this.obj.innerHTML;
            this.obj.innerHTML = null;
            this.append(tag);
            tag = null;
        },


        each : function(func){
                for (var i = 0; i < this.obj.length; i++) {
                    func.call(this.obj[i], i);
            }
        },

        remove : function(element){
            var compareEle = new Array();
            $(element).each(function (item) {
                compareEle.push(this);
            });
            if(this.length == 1){
                //
                for(var i= 0,len = compareEle.length;i<len;i++){
                    if(this.obj == compareEle[i]){
                        this.obj.parentNode.removeChild(this.obj);
                    }
                }
            }else{
                //
                this.each(function(index){
                    for(var i= 0,len = compareEle.length;i<len;i++){
                        if(this == compareEle[i]){
                            this.parentNode.removeChild(this);
                        }
                    }

                })

            }
        },

        empty : function(element){
            var compareEle = new Array();
            $(element).each(function (item) {
                compareEle.push(this);
            });
            if(this.length == 1){
                for(var i= 0,len = compareEle.length;i<len;i++){
                    if(this.obj == compareEle[i]){
                        this.obj.innerHTML = "";
                    }
                }
            }else{
                this.each(function(index){
                    for(var i= 0,len = compareEle.length;i<len;i++){
                        if(this == compareEle[i]){
                            this.innerHTML = "";
                        }
                    }

                })
            }


        },

        /***********************event************************/

        ready : function(func){
            //IE6，7，8支持
            $(document).bind("DOMContentLoaded", function(){
                func();
            });
        },


        /***
         * event, data, func
         */
        bind : function(){
            var that = this;
            if(arguments.length == 1){
                //参数只有一个时，那是对象，键值对，key是事件名称，value是callback
                var events = arguments[0];

                for(var item in events){
                    addEvent(item, events[item]);
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
                    that.obj.addEventListener(type, func, false);
                }else if(window.attachEvent){
                    that.obj.attachEvent('on' + type, func);
                }
            }
            return this;
        },

        unbind : function(){
            if(arguments.length == 1){
                //
                var events = arguments[0];

                for(var item in events){
                    removeEvent(item, events[item]);
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




    };



    Daisy.prototype.init.prototype = Daisy.prototype;




    window.$ = Daisy;

})(window);



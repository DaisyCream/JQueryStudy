/**
 * Created by DaisyCream on 16/4/25.
 */

(function ( global, factory ) {
    //是否存在模块，因为如果是commandJs环境的时候，可以用exports来得到模块
    //var jQuery = require("jQuery")(window);
    if( typeof module === "object"&& typeof module.exports === "object"){
        module.exports = global.document?
            factory( global, true) :
            function( w ){
                if(!w.document){
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            }
    } else{
        factory ( global );
    }


    //在node中window是无效的
})(typeof window !== "undefined" ? window : this, function(window, noGlobal){

    var arr = [];

    var document = window.document;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};


    var
        version = "2.2.3",

        jQuery = function( selector, context){

            return new jQuery.fn.init(selector, context);
        },

        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {

        jquery : version,

        constructor : jQuery,


        //开始时是一个空字符串
        selector : "",

        //一个默认jquery对象长度是0
        length : 0,

        toArray : function(){
            return slice.call(this);
        },


        //如果num有数值的时候，则返回符合的元素
        //如果num没有的时候，则返回一个干净的数组（里面装有对象集合）
        get : function(num){
            return num != null ?

                //返回需要的单个元素
                (num<0?this[ num + this.length ] : this[ num ]) :

                //返回所有元素的集合
                slice.call(this);
        },

        //
        pushStack : function( elems ){

            //建立一个新的jQuery设置匹配元素
            var ret = jQuery.merge( this.constructor(), elems);

            //将老元素加入到栈中
            ret.prevObject = this;
            ret.context = this.context;

            return ret;
        },

        each : function(callback) {
            return jQuery.each( this, callback);
        },

        slice : function(){
            return this.pushStack( slice.apply(this, arguments) );
        },

        first : function(){
            return this.eq(0);
        },

        last : function(){
            return this.eq(-1);
        },

        eq : function(i){
            var len = this.length,
                j = +i + (i < 0? len : 0);
            return this.pushStack( j >= 0 && j < len ? [ this [ j ] ] : [] );

        },

        end : function(){
            return this.prevObject || this.constructor();
        },


        //
        push : push,
        sort : arr.sort,
        splice : arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function(){
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        //
        if(typeof target === "boolean") {
            deep = target;

            //
            target = arguments[i] || {};
            i++;
        }

        if(typeof target !== "object" && !jQuery.isFunction(target)){
            target = {};
        }

        if( i === length){
            target = this;
            i--;
        }

        for(; i<length;i++){

            if((options = arguments[i]) != null){

                for(name in options){
                    src = target[ name ];
                    copy = options[ name ];
                }

                if(target === copy){
                    continue;
                }

                if(deep && copy && (jQuery.isPlainObject(copy)||
                    ( copyIsArray = jQuery.isArray(copy)))){

                    if(copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    } else{
                        clone = src && jQuery.isPrototypeOf(src) ? src : {};
                    }
                } else if(copy !== undefined){
                    target[ name ] = copy;
                }

            }
        }

        return target;

    };

    jQuery.extend({

        expando : "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        isReady : true,

        error : function(msg){
            throw new Error(msg);
        },

        noop : function(){},

        isFunction : function(obj){
            return jQuery.type(obj) === "function";
        },

        isArray : Array.isArray,

        isWindow : function(obj){
            return obj != null && obj === obj.window;
        },

        isNumeric : function(obj){
            var realStringObj = obj && obj.toString();
            return !jQuery.isArray(obj)&& (realStringObj) - parseFloat(realStringObj)

        }
    })




});
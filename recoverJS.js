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

        //Support: Android<4.1
        // Make sure we trim修剪 Bom and NBSP
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

        //
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

        //
        expando : "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        //
        isReady : true,

        error : function(msg){
            throw new Error(msg);
        },

        noop : function(){},

        isFunction : function(obj){
            return jQuery.type(obj) === "function";
        },

        //判断是否是数组，数组自带方法Array.isArray(str);
        isArray : Array.isArray,

        //ES标准要求，所有的js解释器都要将window对象视为全局(global)，并且global.window = global
        isWindow : function(obj){
            return obj != null && obj === obj.window;
        },

        isNumeric : function(obj) {
            var realStringObj = obj && obj.toString();//存在就为obj，不然obj的toString
            return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
        },

        isPlainObject: function(obj){
            var key;

            if(jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)){
                return false;
            }

            if( obj.constructor &&
                !hasOwn.call( obj, "constructor") &&
                !hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf")){
                return false;
            }

            for( key in obj){}

            return key === undefined || hasOwn.call(obj, key);
        },

        isEmptyObject: function( obj ){
            var name;
            for( name in obj ){
                return false;
            }
            return true;;
        },

        type : function( obj ){
            if( obj == null ){
                return obj + "";
            }

            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },

        globalEval : function( code ){
            var script,
                indirect = eval;

            //过滤空格
            code = jQuery.trim( code );

            if( code ){

                if( code.indexOf( "use strict" ) === 1 ){
                    script = document.createElement( "script" );
                    script.text = code;
                    document.head.appendChild(script).parentNode.removeChild(script);
                } else {
                    indirect(code);
                }
            }
        },

        camelCase : function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        /***
         * 如果元素的名字相等的话，返回true，否则就false
         * @param elem
         * @param name
         * @returns {jQuery.nodeName|Function|string|boolean}
         */
        nodeName : function(elem, name){
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        each : function(obj, callback){
            var length,
                i = 0;

            if( isArrayLike(obj)){//类数组对象
                length = obj.length;
                for( ;i<length;i++){
                    if( callback.call(obj[i], i, obj[i]) === false){
                        break;
                    }
                }
            } else{//对象
                for( i in obj){
                    if(callback.call(obj[i], i, obj[i]) === false){
                        break;
                    }
                }
            }

            return obj;

        },

        //Support: Android<4.1
        trim : function(text){
            return text == null ?
                "":
                (text + "").replace(rtrim, "");
        },

        makeArray : function(arr, results){
            var ret = results || [];

            if(arr != null){
                if(isArrayList(Object(arr))){
                    //merge方法是两个数组联合，所以需要把不是数组的变为数组
                    jQuery.merge(ret,
                        typeof arr === "string"?
                            [arr] : arr
                    );
                }else{//若是数组
                    push.call(ret, arr);
                }
            }

        },

        /***
         * 检索位置i,indexOf(str,i),i为从什么位置开始检索
         * @param elem
         * @param arr
         * @param i
         * @returns {number}
         */
        inArray : function(elem, arr, i){
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },

        merge : function(first, second){
            var len = +second.length,
                j = 0,
                i = first.length;

            for( ; j < len ;j++){
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },

        grep : function(elems, callback, invert){//转化
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExcept = !invert;

            for(;i < length;i++){
                callbackInverse = !callback(elems[i], i);
                if(callbackInverse !== callbackExcept){
                    matches.push(elems[i]);
                }
            }
            return matches;
        },


        map : function(elems, callback, arg){
            var length, value,
                i = 0,
                ret = [];

            if(isArrayLike(elems)){
                length = elems.length;
                for( ;i<length;i++){
                    value = callback(elems[i], i, arg);

                    if(value != null){
                        ret.push(value);
                    }
                }
            } else{
                for(i in elems){
                    value = callback(elems[i], i, arg);//value index

                    if(value != null){
                        ret.push(value);
                    }
                }
            }

            return concat.apply([], ret);
        },

        guid : 1,

        //绑定一个功能到上下文中，可选择部分的应用所有的参数
        proxy : function (fn, context) {
            var tmp, args, proxy;

            //说明fn是一个对象，而且运行的函数就在fn[context]中，环境就是fn自身
            if(typeof context === "string"){
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            if(!jQuery.isFunction(fn)){
                return undefined;
            }

            args = slice.call(arguments, 2);//多余的参数
            proxy = function(){
                //slice.call()目的是将arguments类数组对象变为数组
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            //不明白！！！
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now : Date.now,

        support : support

    });

    if(typeof Symbol === "function"){
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }

    jQuery.each("Boolean Number String Function Array Data RegExp Object Error Symbol".split(" "),
        function(i, name){
            class2type["[Object " + name + "]"] = name.toLowerCase();
        }
    );

    function isArrayLike(obj){

        //in操作符用来判断某个属性属于某个对象
        var length = !!obj && "length" in obj && obj.length,
            type = jQuery.type(obj);

        //排除function和window和global对象
        if(type === "function" || jQuery.isWindow(obj)){
            return false;
        }

        return type === "array" || length === 0 || typeof length === "number" &&
                length > 0 && (length -1) in obj;
    }

    var Sizzle =
        (function(window){
                var i,
                    support,
                    Expr,
                    getText,
                    isXML,
                    tokenize,
                    complie,
                    select,
                    outermostContext,
                    sortInput,
                    hasDuplicate,//重复

                    //Local document vars
                    setDocument,
                    document,
                    docElem,
                    documenIsHTML,
                    rbuggyQSA,
                    rbuggyMathes,
                    mathes,
                    contains,

                    //Instance-specific data
                    expando = "sizzle" + 1 * new Date(),
                    preferredDoc = window.document,
                    dirruns = 0,
                    done = 0,
                    classCache = createCache(),
                    tokenCache = createCache(),
                    compilerCache = createCache(),
                    sortOrder = function(a,b){
                        if(a == b){
                            hasDuplicate = true;
                        }
                        return 0;
                    },

                    // General-purpose constants
                    MAX_NEGATIVE = 1 << 31,

                    //Instance methods
                    hasOwn = ({}).hasOwnProperty,
                    arr = [],
                    pop = arr.pop,
                    push_native = arr.push,
                    push = arr.push,
                    slice = arr.slice,
                    //使用一个精简的指标让它比本地更快
                    indexOf = function(list, elem){
                        var i= 0,
                            len = list.length;
                        for( ; i < len; i++){
                            if(list[i] === elem){
                                return i;
                            }
                        }
                        return -1;
                    },

                    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                    // regular expressions

                    whitespace = "[\\x20\\t\\r\\n\\f]",

                    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

                    // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                            // Operator (capture 2)
                        "*([*^$|!~]?=)" + whitespace +
                            // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                        "*\\]",

                    pseudos = ":(" + identifier + ")(?:\\((" +
                            // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                            // 1. quoted (capture 3; capture 4 or capture 5)
                        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                            // 2. simple (capture 6)
                        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                            // 3. anything else (capture 2)
                        ".*" +
                        ")\\)|)",

                    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                    rwhitespace = new RegExp( whitespace + "+", "g" ),
                    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

                    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
                    rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

                    rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

                    rpseudo = new RegExp( pseudos ),
                    ridentifier = new RegExp( "^" + identifier + "$" ),

                    matchExpr = {
                        "ID": new RegExp( "^#(" + identifier + ")" ),
                        "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
                        "TAG": new RegExp( "^(" + identifier + "|[*])" ),
                        "ATTR": new RegExp( "^" + attributes ),
                        "PSEUDO": new RegExp( "^" + pseudos ),
                        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                        "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                        // For use in libraries implementing .is()
                        // We use this for POS matching in `select`
                        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                            whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                    },

                    rinputs = /^(?:input|select|textarea|button)$/i,
                    rheader = /^h\d$/i,

                    rnative = /^[^{]+\{\s*\[native \w/,

                    // Easily-parseable/retrievable ID or TAG or CLASS selectors
                    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                    rsibling = /[+~]/,
                    rescape = /'|\\/g,

                    runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
                    funescape = function(_, escaped, escapedWhitespace){
                        var high = "0x" + escaped - 0x10000;

                        return high !== high || escapedWhitespace ?
                            escaped :
                            high < 0 ?
                                //BMP codepoint
                                String.fromCharCode(high + 0x10000) :
                                String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);

                    },

                    unloadHandler = function() {
                        setDocument();
                    };


                try {
                    push.apply(
                        (arr = slice.call(preferredDoc.childNodes)),
                        preferredDoc.childNodes
                    );

                    // Support : Android < 4.0
                    // 静态变量检测push.call失败
                    arr[preferredDoc.childNodes.length].nodeType;
                }catch(e){
                    push = { apply : arr.length ?

                        function(target , els){
                            push_native.apply( target, slice.call(els));
                        }
                        : function(){}};
                }
            }

        );








});
/**
 * Created by DaisyCream on 16/5/6.
 */

var s = {
    on : function(types, selector, data, fn, /*INTERNAL*/ one) {
        var origFn, type;

        //Types can be a map of typds/handlers
        if (typeof types === "object") {
            //(type-Object, selector, data)
            if (typeof selector !== "string") {
                //(type-Object, data)
                data = data || selector;
                selector = undefined;
            }

            for (type in types) {
                this.on(type, selector, data, types[type], one);
            }
            return this;
        }

        if (data == null && fn == null) {
            //(types, fn)
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {
                //(types, selector, fn)
                fn = data;
                data = undefined;
            } else {
                //(typds, data , fn)
                fn = data;
                data = selector;
                selector = undefined;
            }
        }

        //
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return this;
        }

        if (one === 1) {
            origFn = fn;
            fn = function (event) {
                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);

            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);

        }

        //这里用each是因为this可能是一个类数组对象
        return this.each(function () {
            jQuery.event.add(this, types, fn, data, selector);
        });


    },

    eventHandle : function(eventHandle, elemData){
        if(!(eventHandle = elemData.handle)){
            eventHandle = elemData.handle = function(e){
                return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered/*触发*/ !== e.type)?
                    jQuery.event.dispatch.apply(eventHandle.elem, arguments):
                    undefined;
            }
        }

        eventHandle.elem = elem;
    },




    symOn : function(handler){
        core_rnotwhite = "/\S+\g";
        //第一步：获取数据缓存
        elemData = data_priv.get(elem);

        //第二步：创建编号
        //在每一个事件的句柄给一个标识，添加ID的目的是用来寻找或者删除handler
        if(!handler.guid){
            handler.guid = jQuery.guid ++;
        }

        //第三部：分解事件名和句柄
        if(!(events = elemData.events)){
            //如果不存在就为重新创建对象
            events = elemData.events = {};
        }

        if(!(eventHandle = elemData.handle)){
            eventHandle = elemData.handle = function(e){
                return typeof jQuery !==core_strundefined && (!e || jQuery.event.triggered !== e.type)?
                    jQuery.event.dispatch.apply(eventHandle.elem, arguments):
                    undefined;
            };
            eventHandle.elem = elem;
        }

        //可能是通过空格分隔字符串，所以将其变成字符串数组
        types = (types || "").match(core_rnotwhite)|| [""];

        t = types.length;

        while(t--){
            //尝试取出事件命名空间
            //如“mouseover.a.b” - ["mouseover.a.b","mouseover","a.b"];
            tmp = rtypenamespace.exec(types[t]) || [];
            //取出事件类型，如mouseover
            type = origType = tmp[1];
            //取出事件命名空间，如a.b，并根据“.”分隔成数组
            namespcae = (tmp[2] || "").split(".").sort();

            if(!type){
                continue;
            }

            //事件是否会改变当前状态，如果会则使用特殊事件
            special = jQuery.event.special[type] || {};

            //delegate代表
            //根据是否已定义selector，决定使用哪个特殊事件api，如果没有非特殊事件，则用type
            type = (selector ? special.delegateType : special.bindType) || type;

            //type状态发生改变，重新定义特殊事件
            special = jQuery.event.special[type] || {};

            handleObj = jQuery.extend({
                type : type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                namespace: namespaces.join(".")
            },handleObjIn);

            //初始化事件处理队列，如果是第一次使用，将执行语句
            if(!(handlers = events[type])){
                handlers = events[type] = [];
                handlers.delegateCount = 0;

                if(!special.setup || special.setup.call(elem,data,namespaces,eventHandle)===false){
                    if(elem.addEventListener){
                        elem.addEventListener(type, eventHandle, false);
                    }
                }
            }

            if(special.add){
                special.add.call(elem, handleObj);
                //设置事件处理函数的ID
                if(!handleObj.handler.guid){
                    handleObj.handler.guid = handler.guid;
                }

            }

            //将事件处理对象推入处理列表，姑且定义为事件处理对象包
            if(selector){
                handlers.splice(handler.delegateCount++, 0, handleObj);
            } else{
                handlers.push(handleObj);
            }

            //表示事件曾经使用过，用于事件优化
            jQuery.event.global[type] = true;

        }

        // 设置为null避免IE中循环引用导致的内存泄露
        elem = null;
    }


};

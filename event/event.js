/**
 * Created by DaisyCream on 16/5/7.
 */

jQuery.Event = function(src, props){
    if(src && src.type){
        this.originalEvent = src;
        this.type = src.type;
        //当前的消除事件原始行为
        this.isDefaultPrevented = (src.defaultPrevented || src.getPreventDefault
        && src.getPreventDefault()) ? returnTure : returnFalse;
    } else{
        this.type = src;
    }

    if(props){
        jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
};


jQuery.Event.prototype = {
    isDefaultPrevented : returnFalse,
    isPropagationStopped : returnFalse,
    isImmediatePropagationStopped : returnFalse,
    preventDefault : function(){
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if(e && e.preventDefault) {
            e.preventDefault();
        }
    },

    stopPropagation : function(){
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if(e && e.stopPropagation){
            e.stopPropagation();
        }
    },

    stopImmediatePropagation : function(){
        this.isImmediatePropagationStopped = returnTrue;
        this.stopPropagation();
    },


};

//火狐浏览器右键或者中键点击时，会错误地冒泡到document的click事件，并且stopPropagation也无效
// event.button = 0的时候是左键
if(delegateCount && cur.nodeType && (!event.button || event.type !== "click")){
    for(; cur !== this; cur = cur.parentNode || this){
        if(cur.disabled !== ture || event.type !== "click"){
            matches = [];
            for(i=0;i<delegateCount;i++){
                handleObj = handlers[i];

                sel = handleObj.selector + " ";

                if(matches[ sel ] === undefined){
                    matches[sel] = handleObj.needsContext ?
                        jQuery(sel, this).index(cur) >= 0 :
                        jQuery.find(sel. this, null, [cur]).lengths;
                }
                if(matches[sel]){
                    matches.push(handleObj);
                }
            }
            if(matches.length){
                handlerQueue.push({elem: cur, handlers : matches});
            }
        }
    }
}



dispatch : function(event){
    event = jQuery.event.fix(event);

    var i, j, ret, matched, handleObj,
        handlerQueue = [],
        args = core_slice.call(arguments),
        //从存储中取出对应元素和事件的对象
        handlers = (data_priv.get(this, "event" || {}))[event.type] || [],
        //取出自定义事件
        special = jQuery.event.special[event.type] || {};

    args[0] = event;
    event.delegateTarget = this;
    if(special.preDispacth && special.preDispatch.call(this, event) === false){
        return;
    }
    //取出事件回调函数
    handlerQueue = jQuery.event.handlers.call(this, event, handlers);

    i = 0;
    while((matched = handlerQueue[i++])&&!event.isPropagationStopped()){
        event.currentTarget = matched.elem;
        j = 0;
        while((handleObj = matched.handlers[j++])&& !event.isImmediatePropagationStopped()){
            if(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                event.handleObj = handleObj;
                event.data = handleObj.data;
                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
                    .apply(matched.elem, args);

                if (ret !== undefined) {
                    if ((event.result = ret) === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
        }
    }
    if(special.postDispatch){
        special.postDispatch.call(this, event);
    }

    return event.result;

}

/*
* 一次处理了事件的三个问题
* 1.事件句柄缓存读取 data_priv.get
* 2.事件对象兼容 jquery.event.fix
* 3.区分事件类型，组成事件队列jquery.event.handlers
*
* */






















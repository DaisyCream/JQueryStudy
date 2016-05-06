/**
 * Created by DaisyCream on 16/5/6.
 */

{
    on : function(types, selector, data, fn, /*INTERNAL*/ one){
        var origFn, type;

        //Types can be a map of typds/handlers
        if(typeof typds === "object"){
            //(type-Object, selector, data)
            if(typeof selector !== "string") {
                //(type-Object, data)
                data = data || selector;
                selector = undefined;
            }

            for( type in types ){
                this.on(type, selector, data, types[type], one);
            }
            return this;
        }

        if(data == null && fn == null){
            //(types, fn)
            fn = selector;
            data = selector = undefined;
        } else if(fn == null){
            if(typeof selector === "string"){
                //(types, selector, fn)
                fn = data;
                data = undefined;
            }else {
                //(typds, data , fn)
                fn = data;
                data = selector;
                selector = undefined;
            }
        }

        //
        if( fn === false){
            fn = returnFalse;
        }else if(!fn){
            return this;
        }

        if(one === 1){
            origFn = fn;
            fn = function(event){
                // Can use an empty set, since event contains the info
                jQuery().off(event);

            }


        }


    }


}
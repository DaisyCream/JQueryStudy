/**
 * Created by DaisyCream on 16/5/17.
 */

var namespace = {
    req : function(str){
        var arr = str.split(".");
        var namespace = window;

        for(var i= 0,len = arr.length;i<len;i++){
            if(typeof namespace[arr[i]] == "undefined"){
                namespace[arr[i]] = {};
            }

            namespace = namespace[arr[i]];

        }

    },

    del : function(str){
        var arr = str.split(".");
        var namespace = window;

        for(var i= 0,len = arr.length;i<len;i++){
            if(typeof namespace[arr[i]] == "undefined"){
                return;
            }else if(len == i + 1){
                delete namespace[arr[i]];
            }else{
                namespace = namespace[arr[i]];
            }
        }

    }

};
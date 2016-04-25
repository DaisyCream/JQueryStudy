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

});
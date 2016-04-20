/**
 * Created by DaisyCream on 16/4/20.
 */
function foo(num){
    console.log("foo : " + num);

    this.count++;
};


//foo.count = 0;
//var s = new foo(1);


//s.count = 0;

global.count = 0;

foo.count = 0;

var i;

for(i =0;i<10;i++){
    if(i>5){
        foo(i);
    }
}

console.log(foo.count);
console.log(global.count);
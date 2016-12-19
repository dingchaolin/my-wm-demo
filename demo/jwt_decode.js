let jwt = require('jsonwebtoken');

function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime; ) { }
}
let exp = Math.floor(+Date.now() / 1000) + 2;
console.log( exp );
// 创建 token
let token = jwt.sign({
    exp: exp,
    data: {
        name:'dcl',
        age:234
    },
}, 'wmdx');

console.log( token );

setInterval( function(){
    try{
        // 解析token
        let decoded = jwt.decode(token, 'wmdx');
        console.log( decoded );
        let exp1 = Math.floor(+Date.now() / 1000);
        console.log( exp1 );
        if( decoded.iat < exp1 ){
            console.log( "没有过期！");
        }else{
            console.log( "过期..." );
        }
    }catch( e ){
        console.log( "token 过期，Error info：" + e.toString() );
    }
}, 100 );

//verify decode 区别
// verify 在token过期之后 就不能解析了 再解析会报错
// token  在token过期之后 还可以解析
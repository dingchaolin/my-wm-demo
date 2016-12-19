let Mock = require('mockjs');
let Random = Mock.Random;
let email = Random.email();
 console.log( email );

console.log( Mock.mock('@EMAIL') );

console.log( Mock.mock( { email: '@EMAIL' } ).email );

Random.extend({
    constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    constellation: function(date){
        return this.pick(this.constellations)
    }
})
console.log( Random.constellation());
// => "水瓶座"
console.log(Mock.mock('@CONSTELLATION'));
// => "天蝎座"
console.log( Mock.mock({ constellation: '@CONSTELLATION'}));
// => { constellation: "射手座" }


console.log( Random.boolean());
// => true
console.log( Random.boolean(1, 9, true));
// => false
console.log( Random.bool());
// => false
console.log( Random.bool(1, 9, false));
// => true
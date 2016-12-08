/**
 * Created by chaolinding on 2016/11/26.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/dclTest");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var t1Schema = new Schema({
name: {type: String},
age: {type: Number},
addr: {type: String}
});

var t1Model = mongoose.model("t1", t1Schema);

var t2Schema = new Schema({
job: {type: String},
love: {type: String},
t1Id: {type: mongoose.Schema.Types.ObjectId, ref: "t1"}
});

var t2Model = mongoose.model("t2", t2Schema);

function test1() {
var doc = {
    name: "AAAA",
    age: 20,
    addr: "beijing"
};
t1Model.create(doc, function (err, response) {
    console.log(typeof response._id);
var doc = {
    job: "chengxuyuan",
    love: "changge",
    t1Id: response._id.toString()
};
t2Model.create(doc, function (err, response) {
    console.log(arguments);
});
});
}

test1();

t2Model.find({}).exec(function( err, res ){
    console.log("----------------------------");
//var t = JSON.stringify( res );
//res = res.toJSON();//JSON.parse( t );
res = res.map( item=>{
    return item = item.toJSON();
})
console.log( res );//这里返回一个数组
                     console.log("----------------------------");
for( let i = 0; i < res.length ; i ++ ){
    res[i].yyyy = "qqqqqqq";//对数组中的每一个对象添加一个属性 yyyy
//res[i].job = "ssssss";
    console.log( res[i] );
    console.log(res[i].yyyy);
}
console.log("--------------+++++++++++++--------------");
//setTimeout( null, 3000 );
console.log( t );// 打印res  没有yyyy 属性

                    console.log( "-----------------------");
for( let i = 0; i < res.length ; i ++ ){
    console.log( res[i] );// 这样能访问到新加的属性 yyyy
}
})
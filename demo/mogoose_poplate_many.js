const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/dclTest");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


let t1Schema = new Schema({
    name: {type: String},
    age: {type: Number},
    addr: {type: String}
});
let t1Model = mongoose.model("t1", t1Schema);

let t3Schema = new Schema({
    school: {type: String},
    teacher: {type: String},
    course: {type: String}
});
let t3Model = mongoose.model("t3", t3Schema);


let t2Schema = new Schema({
    job: {type: String},
    love: {type: String},
    t1Id: {type: mongoose.Schema.Types.ObjectId, ref: "t1"},
    t3Id: {type: mongoose.Schema.Types.ObjectId, ref: "t3"}
});

let t2Model = mongoose.model("t2", t2Schema);

function test2() {
    let docT3 = {
        school: "beijing daxue",
        teacher: "laozhang",
        course: "C++"
    };
    t3Model.create(docT3, function (err, responseT3) {
        let docT1 = {
            name: "zhangsan",
            age: 35,
            addr: "chang an jie"
        };
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log( responseT3 );
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$");
        t1Model.create(docT1, function (err, responseT1) {
            let doc = {
                job: "chengxuyuan",
                love: "liuyifei",
                t1Id: responseT1._id.toString(),
                t3Id:responseT3._id.toString()
            };
            t2Model.create(doc, function (err, response) {
                console.log(response);
            });
        });
    });
}
test2();

t2Model.find({love:'liuyifei'},'love t1Id t3Id').populate('t1Id','name age').populate('t3Id','school teacher').exec( function( err, result){
    console.log("=========查询结果===================");
    console.log( result );
});
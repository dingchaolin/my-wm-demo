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

let t2Schema = new Schema({
    job: {type: String},
    love: {type: String},
    t1Id: {type: mongoose.Schema.Types.ObjectId, ref: "t1"}
});

let t2Model = mongoose.model("t2", t2Schema);

function test1() {
    let doc = {
        name: "AAAA",
        age: 20,
        addr: "beijing"
    };
    t1Model.create(doc, function (err, response) {
        console.log(typeof response._id);
        let doc = {
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

t2Model.find({},'love t1Id').populate('t1Id','name age').exec( function( err, result){
    console.log("=========查询结果===================");
    console.log( result );
});
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/dclTest");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


let t1Schema = new Schema({
    name: {type: String},
    age: {type: Number},
    addr: {type: String},
    tags: { type: [String], index: true } // field level
});
t1Schema.set('autoIndex', false);
t1Schema.index({ _id: 1 }, { sparse: true });


let t1Model = mongoose.model("t1", t1Schema);

t1Model.on('index', function(error) {
    // "_id index cannot be sparse"
    console.log(error.message);
});

function test2() {

    let docT1 = {
        name: "zhangtianai",
        age: 20,
        addr: "beijing"
    };

    t1Model.create(docT1, function (err, responseT1) {
        console.log( responseT1);
    });
}
test2();

t1Model.find({}).exec( function( err, result ){
    console.log( "+++++++++++++++++查询结果+++++++++++++++++++++++");
    console.log( result );
});

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
    addr: {type: String},
    birthDay:Date
});

var t1Model = mongoose.model("t1", t1Schema);


var doc = {
    name: "ys",
    age: 20,
    addr: "beijing",
    birthDay:new Date('2016-09-06 11:27:17.556163')
};
t1Model.create(doc, function (err, response) {
    console.log(response);
});

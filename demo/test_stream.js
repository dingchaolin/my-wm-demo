const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/dclTest");
const Schema = mongoose.Schema;

var t2Schema = new Schema({
    job: {type: String},
    love: {type: String},

});

if( !t2Schema.options.toJSON){
    t2Schema.options.toJSON = {};
}
t2Schema.options.toJSON.transform = function(   doc, ret ){
    ret.createdTime= ret.createdTime&& ret.createdTime.valueOf();
    delete ret.__v;
    delete ret._id;
}
var t2Model = mongoose.model("t2", t2Schema);

var doc = {
    job: "chengxuyuan",
    love: "changge"
};
t2Model.create(doc, function (err, response) {
    console.log(arguments);
});

let stream = t2Model.find({},'job love').stream();
stream.on('data',function( item){
    console.log( "item = %j", item );
    stream.pause();// 暂停流
    setTimeout( function(){
        return stream.resume();// 延时启动流
    },1000);
}).on('close', function( ){
    console.log('++++++++++ finish! ++++++++++++');
}).on('error', function( err) {
    console.log('err: %j=', err );
});


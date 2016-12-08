/**
 * Created by chaolinding on 2016/11/26.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/allus");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//const mongoose = require('mongoose');
//const timestamp = require('mongoose-timestamp');
//const softDelete = require('mongoose-softdelete');
//const history = require('mongoose-history');

//const Schema = mongoose.Schema;
//const ObjectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
    id: Number,
    orderNumber: Number,
    userId: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    courseId: {
        type: Number,
        required: true,
    },
    courseName: String,
    majorId: Number,
    majorName: String,
    genreId: Number,
    genreName: String,
    channel: Number,
    source: String,
    canceled: Number,
    paid: Number,
    postAt: Date,
    expireAt: Date,
    agentId: Number,
    type: Number,
    years: Number,
    createdAt: Date,
    updatedAt: Date,
    isLive: {
        type: Number,
        default: 0,
    }, // 0 默认值 录播课程 1 直播课程
    refId: ObjectId,
}, {
    versionKey: false,
});

// orderSchema
//     .plugin(timestamp)
//     .plugin(softDelete)
//     .plugin(history);

var order = mongoose.model('Order', orderSchema);


var t1Schema = new Schema({
    id : Number,
    userId : Number,
    courseId : Number,
    status : Number,
});

var t1Model = mongoose.model("User_Course", t1Schema);

function test1() {
    order.find({},null, {limit:3}).exec(function( err, res ){
        console.log("----------------------------");
        console.log( res );
        console.log("----------------------------");
        for( let i = 0; i < res.length ; i ++ ){
            res[i].yyyy = "qqqqq";
        }
        console.log( res );
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
        for( let i = 0; i < res.length ; i ++ ){
            console.log( res[i].yyyy );
        }
    })
}

test1();


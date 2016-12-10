const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/vicer");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const videoSchema = new Schema({
    status : String,
    originFile : String,
    fingerprint : String,
    createdAt : String,
    size : Number,
    segmentsSize : {
        pc_high : Number,
        mobile_mid : Number,
        pc_mid : Number,
        pc_low : Number,
        mobile_low : Number
    },
    name : String,
    url : {
        pc_high : String,
        mobile_mid : String,
        pc_mid : String,
        pc_low : String,
        mobile_low : String
    },
    segmentsMetadata : {
        pc_high : {
            duration : String,
            video : {
                profile : String,
                codec : String,
                resolution : String,
                fps : String
            },
            audio : {
                bitrate : String,
                codec : String,
                frequency : String
            },
            bitrate : String
        },
        mobile_mid : {
            duration : String,
            video : {
                profile : String,
                codec : String,
                resolution : String,
                fps : String
            },
            audio : {
                bitrate : String,
                codec : String,
                frequency : String
            },
            bitrate : String
        },
        pc_mid : {
            duration : String,
            video : {
                profile : String,
                codec : String,
                resolution : String,
                fps : String
            },
            audio : {
                bitrate : String,
                codec : String,
                frequency : String
            },
            bitrate : String
        },
        pc_low : {
            duration : String,
            video : {
                profile : String,
                codec : String,
                resolution : String,
                fps : String
            },
            audio : {
                bitrate : String,
                codec : String,
                frequency : String
            },
            bitrate : String
        },
        mobile_low : {
            duration : String,
            video : {
                profile : String,
                codec : String,
                resolution : String,
                fps : String
            },
            audio : {
                bitrate : String,
                codec : String,
                frequency : String
            },
            bitrate : String
        }
    },
    lectureId : String,
    progress : Number,
    metadata : {
        duration : String,
        video : {
            profile : String,
            bitrate : String,
            codec : String,
            resolution : String,
            fps : String
        },
        audio : {
            bitrate : String,
            codec : String,
            frequency : String
        },
        bitrate : String,
    },
    updatedAt : Date
}, {
    versionKey: false,
});

const Video = mongoose.model('Video', videoSchema);

var count = 0;

var stream = Video.find({$where:"this.updatedAt == null"}).stream();

//一次一条
stream.on('data',function( item){
    count ++;
    if( count % 100 == 0 ){
        console.log(`处理了 ${count} 条了...`);
    }
    //stream.pause();// 暂停流

    Video.update({ _id:item._id.toString() },{ $set: {updatedAt:new Date(item.createdAt)} }).exec( function( err, res){
        if( err ){
            console.log( "+++++++++++++++++++++++++++++++++++++++");
            console.log('err: %j=', err, "res: %j=", res );
            console.log( "+++++++++++++++++++++++++++++++++++++++");
         }
    });
    // setTimeout( function(){
    //     return stream.resume();// 延时启动流
    // },10);
}).on('close', function( ){
    console.log('++++++++++ finish! ++++++++++++');
}).on('error', function( err) {
    console.log('err: %j=', err );
});

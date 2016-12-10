var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost/sample';
let timeInter;
MongoClient.connect(url, function(err, db) {
    if(err) { return console.log("connection failed: %s",err); }
    console.log('connected to mongo, ready for duty work');
    var collection=db.collection('files');
    timeInter = setInterval(function(){
        console.log('memroy usage : %j',process.memoryUsage());
    },10000);
    /** fetch all records **/
    var stream=collection.find().stream(),cache=[];
    stream.on('data',function(item){
        cache.push(item);
        if(cache.length==10){
            /** signal mongo to pause reading **/
            stream.pause();
            process.nextTick(function(){
                doLotsWork(cache,function(){
                    cache=[];
                    /** signal mongo to continue, fetch next record **/
                    stream.resume();
                });
            });
        }
    });
    stream.on('end',function(){
        console.log('query ended');
    });
    stream.on('close',function(){
        console.log('query closed');
        clearInterval( timeInter );
    });
});

function doLotsWork(records,callback){
    //.....do lots of work
    //.....
    //all done, ready to deal with next 10 records
    process.nextTick(function(){
        callback();
    });
}
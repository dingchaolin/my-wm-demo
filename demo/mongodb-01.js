let MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

let url = "mongodb://10.8.8.8:27017/dclTest";

// insert
let insertDocs = function( db, collectionName, insertDocs, callback ){
    let collection = db.collection( collectionName );
    collection.insertMany( insertDocs, function( err, result){
        assert.equal( null, err );
        assert.equal( insertDocs.length, result.result.n );
        assert.equal( insertDocs.length, result.ops.length );
        console.log( `${insertDocs.length} doc 插入成功！`);
        callback( result );
        db.close();
    } )
}

// update
let updateDoc = function( db, collectionName, key, setter, callback ){
    let collection = db.collection( collectionName );
    collection.updateOne( key, setter, function( err, result ){
        assert.equal( null, err );
        assert( 1, result.result.n );
        console.log( 'update one success!' );
        callback( result );
        db.close();
    });
};

// delete
let deleteDoc = function( db, collectionName, key, callback ){
    let collection = db.collection( collectionName );
    collection.deleteOne( key, function( err, result ){
       assert.equal( err, null );
       assert.equal( 1, result.result.n );
       console.log( 'remove document success！' );
       callback( result );
       db.close();
    });
}

//find
let findDocs = function( db, collectionName, where, callback ){
    let collection = db.collection( collectionName );
    collection.find( where ).toArray( function( err, result){
        assert.equal( err, null );
        console.log('find this docs');
        console.dir( result );
        callback( result );
        db.close();
    })
}


MongoClient.connect( url,function( err, db ){
    assert.equal( null, err );
    console.log('connect success!');
    //插入测试
    // let docs = [{ name:'wanmen',age:3,addr:'华清嘉园'},
    //     { name:'yinchuang', age:3, addr:'sohoT3'}];
    // insertDocs( db, "t1", docs,function( result ){
    //     console.log("++++++++++++++插入成功+++++++++++++++++++" );
    //     console.log( result );
    //     console.log("++++++++++++++++++++++++++++++++++++++++" );
    // }  );
    // 更新测试
    // updateDoc( db, "t1", {name:'yinchuang'},{$set:{addr:"WangJingSohoT3"}}, function( result){
    //     console.log( result );
    // });
    //删除测试
    // deleteDoc( db, 't1', {name:'wanmen'}, function( result){
    //     console.log( result );
    // });
    //查询
    findDocs( db,'t1',{},function( result){
        console.log( result );
    })

});
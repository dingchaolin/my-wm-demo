/**
 * Created by chaolinding on 2016/12/13.
 */
// async 上传 文件
/*
怎么才能在回掉中返回结果呢？
 */
async.waterfall( [function( callback ){
    uploadFile( param, function( err, res ){
        callback( null, res );
    })
}
], function( err, result ){
    return result;// 这里的结果怎么返回给 get 或者 post 请求呢
})


async.waterfall([
    function(){},
    ],
function( err, result ){
        callback( result );//
});
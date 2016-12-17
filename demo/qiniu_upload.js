const os = require('os');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const qiniu = require('qiniu');
const bluebird = require('bluebird');

const { piliv } = require('../../config');

bluebird.promisifyAll(qiniu.io);

/**
 *
 */
class CloudService {

    /**
     * @param {FileStream} fileStream .
     * @return {String} Image url.
     */
    static * upload(fileStream) {
        const uuid = md5(Math.random().toString());
        const dest = path.join(path.join(os.tmpdir(), uuid));
        const stream = fs.createWriteStream(dest);
        const key = `${uuid}.png`;
        fileStream.pipe(stream);
        qiniu.conf.ACCESS_KEY = piliv.accessKey;
        qiniu.conf.SECRET_KEY = piliv.secretKey;
        const bucket = piliv.imageBucket;
        const uptoken = new qiniu.rs.PutPolicy(`${bucket}:${key}`).token();
        // let filePath = '/Users/chaolinding/Downloads/20151206093326_Tz5n8.thumb.700_0.jpeg';
        // console.log( stream );
        // let extra = new qiniu.io.PutExtra();
        // yield qiniu.io.putFileAsync(uptoken, key, filePath, extra);// stream.path
        // path: '/var/folders/85/kg8nvnjx5p35dk3xyh1hrl5r0000gn/T/4c2df2722b122424c1bc9ce27d9ea343',
        // #################
        let extra = new qiniu.io.PutExtra();
        let filePath = '/Users/chaolinding/Downloads/20151206093326_Tz5n8.thumb.700_0.jpeg';
        qiniu.io.putFile(uptoken, key, filePath, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.key, ret.hash);
                return piliv.imageUrl + ret.key;
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
                return "Error";
            }
        });
        // #################
        return piliv.imageUrl + key;
    }

}

module.exports = CloudService;

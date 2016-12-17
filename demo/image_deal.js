/**
 * Created by chaolinding on 2016/12/14.
 */
let sharp = require( 'sharp' );
//let fs = require('fs');
const os = require('os');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
// sharp('input.jpg').resize(300, 200).toFile('output.jpg', function(err) {
//     if (err) {
//         throw err;
//     }
//     console.log( "处理成功！") ;
// });

const roundedCorners = new Buffer(
    '<svg><rect x="0" y="0" width="200" height="200" rx="200" ry="200"/></svg>'
);

const roundedCornerResizer =
    sharp()
        .resize(200, 200)
        .overlayWith(roundedCorners, { cutout: true })
        .png();

const uuid = md5(Math.random().toString());
const dest = path.join(path.join(os.tmpdir(), uuid));
const writableStream = fs.createWriteStream('./myImage.png');

console.log( "_______文件路径_________====>", dest );

let readableStream = fs.createReadStream( './input.jpg');

//let writableStream = fs.createWriteStream('./out.jpg');
readableStream
    .pipe(roundedCornerResizer)
    .pipe(writableStream);
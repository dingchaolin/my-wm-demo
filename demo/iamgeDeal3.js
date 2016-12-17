/**
 * Created by chaolinding on 2016/12/14.
 */
const bluebird = require('bluebird');

let sharp = require('sharp');
let res = sharp('./input.jpg')
    .rotate()
    .resize(200)
    .toBuffer();
bluebird.promisifyAll(res);
    let str =  res.thenAsync( data => console.log( data ) )
console.log( str );
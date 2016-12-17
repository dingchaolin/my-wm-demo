/**
 * Created by chaolinding on 2016/12/14.
 */

let gm = require('gm');
let fs = require('fs');
let stream = fs.createWriteStream('./my.png');
gm('./input.jpg')
    .stream('png')
    .pipe(stream);


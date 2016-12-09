/**
 * Created by chaolinding on 2016/12/8.
 */
var mergeTo = [4,5,6];
var mergeFrom = [7,8,9];

Array.prototype.push.apply(mergeTo, mergeFrom);
console.log( mergeTo );
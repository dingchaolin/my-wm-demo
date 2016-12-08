/**
 * Created by chaolinding on 2016/12/6.
 */
let a = [{b:1,c:4},{b:2,c:3},{b:3,c:4}];
// a = a.filter( function( item ){
//     return item.b == 3;
// });

for( let i = 0; i < a.length; i ++ ){
    a[i].d =5;
}

console.log( a  );

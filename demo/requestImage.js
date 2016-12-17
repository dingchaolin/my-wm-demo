/**
 * Created by chaolinding on 2016/12/14.
 */
let request = require('request');
let url = 'http://imgs.wanmen.org/3b9c8a587a54cf864e69e7b107e05c9d.png';
let fs = require('fs');
let http = require('http');
//var url = "http://s0.hao123img.com/res/img/logo/logonew.png";
http.get(url, function(res){
    var imgData = "";

    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开


    res.on("data", function(chunk){
        imgData+=chunk;
    });

    res.on("end", function(){
        console.log("文件大小=" + imgData.length );
        fs.writeFile("./output.png", imgData, "binary", function(err){
            if(err){
                console.log("down fail");
            }
            console.log("down success");
        });
    });
});
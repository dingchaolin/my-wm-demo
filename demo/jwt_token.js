let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: String,
    password: String,
    token: String
});

let User = mongoose.model( 'User', UserSchema );

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let app = express();

let port = process.env.PORT || 8080;
let mongoUrl = 'mongodb://10.8.8.8/dclTest';
mongoose.connect( mongoUrl );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // 如果没有body-parser中间件 req中就没有body对象了
app.use(morgan("dev"));// 日志中间件
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');// 允许所有的域名
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');// 允许GET POST 请求
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // 允许 X-Requested-With 和 content-type 头部。
    next();
});

//  登陆验证
app.post('/authenticate', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
});

// 注册
app.post('/signin', function(req, res) {
    //console.log( "body ==============>", req.body );
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, 'wmdx');
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

// 访问一个受限的后端接口
app.get('/me', ensureAuthorized, function(req, res) {
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

// 异常处理
process.on('uncaughtException', function(err) {
    console.log(err);
});

// 服务启动
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
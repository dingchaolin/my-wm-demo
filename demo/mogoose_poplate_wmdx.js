const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://10.8.8.8/allus");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    order: Number,
    promotion: String,
    hide: Boolean,
    partUT: Date, // part update time
}, {
    versionKey: false,
});

let Genre = mongoose.model('Genre', genreSchema);


const majorSchema = new Schema({
    genreId: {
        type: ObjectId,
        ref: 'Genre',
    },
    name: {
        type: String,
        required: true,
    },
    order: Number,
    price: Number,
    promotion: String,
    promotionPicture: String,
    logo: String,
    hide: Boolean,
    description: String,
    partUT: Date, // part update time
}, {
    versionKey: false,
});

let Major = mongoose.model('Major', majorSchema);


Major.find({name:"法语"},'name order genre').populate('genre','name order').exec( function( err, result){
    console.log("=========查询结果===================");
    console.log( result );// undefined
});

// Major.find({name:"法语"},'name order genre').exec( function( err, result){
//     console.log("=========查询结果===================");
//     console.log( result );//
// });
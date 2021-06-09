const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:8081/blog',{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new Schema({
    email:{
        type:String,
        require: true
    },
    nickname:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    created_time:{
        type:Date,
        default:Date.now
    },
    last_modified_time:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:'/public/img/avatar-default.png'
    },
    bio:{
        type:String,
        default:'这个人是条懒狗，什么也没留下'
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    birthday:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Number,
        enum:[0,1,2],
        default:0
    }
});

module.exports = mongoose.model('User',userSchema);


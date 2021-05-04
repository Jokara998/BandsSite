const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:30,
    },
    surname:{
        type:String,
        required:true,
        max:30,
    },
    username:{
        type:String,
        unique:true,
        required: true,
        min:6,
        max:30,
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:1024,
    },
    type:{
        type: String,
        required: true
    },
    approved:{
        type: Boolean
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("users", UserSchema);
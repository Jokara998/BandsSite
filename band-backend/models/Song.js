const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true,
    },
    released:{
        type:String,
        required:false,
        default:"None",
    },
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Album",
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }

    
})

module.exports = mongoose.model("songs", SongSchema);
const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:false,
    },
    band:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Band",
        required:true,
    },
    genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Genre",
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model("albums", AlbumSchema);
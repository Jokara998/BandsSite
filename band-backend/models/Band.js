const mongoose = require("mongoose")

const BandSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    founded:{
        type:String,
        required:true,
    },
    ended:{
        type:String,
        required:false,
        default:"Active"
    },
    genre:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Genre",
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    members:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Musician",
        required:false,
        default:[],
    }

})

module.exports = mongoose.model("bands", BandSchema);
const mongoose = require("mongoose")

const MusicianSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    born:{
        type:String,
        required:true
    },
    died:{
        type:String,
        required:false,
        default:""
    },
    instrument:{
        type:[String],
        required:true
    },
    occupation:{
        type:[String],
        required:true
    },
    bands:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Band",
        required:false,
        default:[],
    },
    image:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    }


});

module.exports = mongoose.model("musicians", MusicianSchema);
const mongoose = require("mongoose")

const GenreSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:false,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("genres", GenreSchema);
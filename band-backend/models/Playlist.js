const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    songs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Song",
        required:false,
        default:[],
    },
    image:{
        type:Buffer,
        required:false,
    },
    date:{
        type:Date,
        default:Date.now(),
    }

});

module.exports = mongoose.model("playlists", PlaylistSchema);
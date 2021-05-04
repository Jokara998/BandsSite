const Song = require("../models/Song")
const ObjectId = require('mongoose').Types.ObjectId; 


const saveSong = async (newSong)=>{
    const savedSong = await newSong.save();
    return findById(savedSong._id)
}

const findById = async (id)=>{
    const song = await Song.findById(id);
    return song;
}

const findAllByAlbumId = async (albumId) =>{
    const songs = await Song.find({album:ObjectId(albumId)}).sort({number:1});
    return songs;
}

const findAll = async () =>{
    const songs = await Song.find();
    return songs;
}

module.exports = {
    saveSong,
    findById,
    findAllByAlbumId,
    findAll,
}
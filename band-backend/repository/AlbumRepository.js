const Album = require("../models/Album")
const ObjectId = require('mongoose').Types.ObjectId; 


const saveAlbum = async (newAlbum) =>{
    const savedAlbum = await newAlbum.save();
    return findById(saveAlbum._id);
}

const findById = async (id) =>{
    const album = await Album.findById(id);
    return album;
}

const findAll = async () =>{
    const albums = await Album.find();
    return albums;
}


const findAllByBandId = async (bandId) =>{
    const albums = await Album.find({band:ObjectId(bandId)});
    return albums;
}

module.exports = {
    saveAlbum,
    findById,
    findAllByBandId,
    findAll
}
const Band = require("../models/Band")
const ObjectId = require('mongoose').Types.ObjectId; 

const saveBand = async (band) =>{
    const savedBand = await band.save();
    return findById(savedBand._id);
}

const findById = async (id) => {
    const band = await Band.findById(id);
    return band;
}

const findAllByGenreId = async (genreId) => {
    const bands = await Band.find({"genre":ObjectId(genreId)});
    return bands;
}

const findAll = async () =>{
    const bands = await Band.find();
    return bands;
}

const addMusicianToBand = async (bandId, musicianId)=>{
    const updateBand = await Band.updateOne(
        { _id:bandId },
        { $push : { "members":musicianId} }
    );

    return updateBand;
}

module.exports = {
    saveBand,
    findById,
    findAllByGenreId,
    findAll,
    addMusicianToBand
    
}
const Musician = require("../models/Musician");
const ObjectId = require('mongoose').Types.ObjectId; 


const saveMusician = async (newMusician) =>{

    const savedMusician = await newMusician.save();
    return findById(savedMusician._id)
}

const findById = async (id) =>{
    const musician = await Musician.findById(id);
    return musician;
}

const findAllbyBandId = async (bandId) =>{
    const musicians = await Musician.find({bands:{$in:ObjectId(bandId)}});
    return musicians;
}

const findAll = async () =>{
    const musicians = await Musician.find();
    return musicians;
}

const addMusicianToBand = async (bandId, musicianId)=>{
    const updateMusician = await Musician.updateOne(
        { _id:musicianId },
        { $push : { "bands":bandId} }
    );

    return updateMusician;
}


module.exports = {
    saveMusician,
    findById,
    findAllbyBandId,
    findAll,
    addMusicianToBand,
}
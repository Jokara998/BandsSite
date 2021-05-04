const ObjectId = require('mongoose').Types.ObjectId; 
const Playlist = require("../models/Playlist");

const savePlaylist = async (newPlaylist) =>{
    const savedPlaylist = await newPlaylist.save();
    return findById(savedPlaylist._id)
}

const updatePlaylist = async (id, name, songs) =>{

    const updatePlaylist = await Playlist.updateOne(
        { _id:id },
        { 
            name:name,
            songs:songs
        }
    );

    return findById(id);
}

const deletePlaylist = async (id) =>{
    const playlist = await Playlist.findById(id);
    const deletedPlaylist = await Playlist.deleteOne({_id: playlist._id});        
    return deletedPlaylist;
}

const findById = async (id) =>{
    const playlist = await Playlist.findById(id);
    return playlist;
}

const findByName = async (name, username) =>{
    const playlist = await Playlist.findOne({name:name, username:username});
    return playlist;
}

const findAllByUsername = async (username) =>{
    const playlists = await Playlist.find({username:username});
    return playlists;
}

module.exports = {
    savePlaylist,
    updatePlaylist,
    deletePlaylist,
    findById,
    findAllByUsername,
    findByName
}
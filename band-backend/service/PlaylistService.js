const {PlaylistRepository, SongRepository} = require("../repository/index");
const SongService = require("./SongService");
const Playlist = require("../models/Playlist")

const savePlaylist = async (username, body) =>{
    try{

        const playlist = await PlaylistRepository.findByName(body.name, username);
        if(playlist){
            return {status:404, message:"You already have playlist with "+ playlist.name+"!"}
        }

        let songs = []
        for(let song of body.songs){
            const s = await SongRepository.findById(song);
            songs.push(s);
        }

        const newPlaylist = Playlist({
            name:body.name,
            username:username,
            songs:songs
        })

        const savedPlaylist = await PlaylistRepository.savePlaylist(newPlaylist);
        const savedDto = await findById(savedPlaylist._id);


        return {
            body:savedDto,
            status:200
        }
        
    }catch(err){
        return {status:404, message:err}
    }
}

const updatePlaylist = async (id, body) =>{
    try{

        let songs = []
        for(let song of body.songs){
            const s = await SongRepository.findById(song);
            songs.push(s);
        }

        const updatedPlaylist = await PlaylistRepository.updatePlaylist(id, body.name, songs);
        const updatedDto = await findById(updatedPlaylist.id);


        return {
            body:updatedDto,
            status:200
        }
        
    }catch(err){
        return {status:404, message:err}
    }
}

const deletePlaylist = async (id) =>{
    try{

        const deletedPlaylist = await PlaylistRepository.deletePlaylist(id);

        return {
            message:"Playlist Deleted!",
            status:200
        }
        
    }catch(err){
        return {status:404, message:err}
    }
}

const findById = async (id) =>{
    try{

        const playlist = await PlaylistRepository.findById(id);
        let playlistDto = {
            id:playlist._id,
            name:playlist.name,
            songs:[]
        }

        for(let song of playlist.songs){
            let s = await SongService.getOne(song);
            playlistDto.songs.push(s.body);
        }

        return {
            body:playlistDto,
            status:200
        }
        
    }catch(err){
        return {status:404, message:err}
    }
}

const findAllByUsername = async (username) =>{
    try{

        const playlists = await PlaylistRepository.findAllByUsername(username);
        let playlistsDto = [];
        for(let playlist of playlists){
            const pDto = await findById(playlist._id);
            playlistsDto.push(pDto.body);
        }

        return {
            body:playlistsDto,
            status:200
        }
        
    }catch(err){
        return {status:404, message:err}
    }
}

module.exports = {
    savePlaylist,
    updatePlaylist,
    deletePlaylist,
    findById,
    findAllByUsername,
}
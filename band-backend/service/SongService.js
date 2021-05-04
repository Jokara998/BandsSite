const {SongRepository, AlbumRepository, BandRepository} = require("../repository/index");
const Song = require("../models/Song");
const {getFile} = require("../drive/drive")


const saveSong = async (body) =>{
    try{
        const album = await AlbumRepository.findById(body.album);
        const newSong = Song({
            name:body.name,
            path:body.path,
            number:body.number,
            duration:body.duration,
            album:album
        })
        if(body.released !== undefined && body.released !== "")
             newSong.released = body.released
        
        const savedSong = await SongRepository.saveSong(newSong);
        return{
            body:{
                id:savedSong._id,
                name:savedSong.name,
                path:savedSong.path,
                number:savedSong.number,
                duration:savedSong.duration,
                released:savedSong.released,
                album:album,
            },
            status:200
        }
    }catch(err){
        return {status:404, message:err}
    }
}

const getOne = async (id) =>{
    try{
        const song = await SongRepository.findById(id);
        const album = await AlbumRepository.findById(song.album);
        const band = await BandRepository.findById(album.band);
        const image = await getFile(album.image, "media", "image")
        const path = await getFile(song.path, "media", "song")

        return{
            body:{
                id:song._id,
                name:song.name,
                path:path,
                number:song.number,
                duration:song.duration,
                released:song.released,
                album:{id:album._id, image:image, name:album.name},
                band:{id:band._id, name:band.name}
            },
            status:200
        }
    }catch(err){
        return {status:404, message:err}
    }
}

const getAll = async () =>{
    try{

        const songs = await SongRepository.findAll();
        const songsDto = []
        songs.map(song=>{
            songsDto.push({
                id:song._id,
                name:song.name,
                path:song.path,
                number:song.number,
                duration:song.duration,
                released:song.released,
                album:song.album,
            })
        })

        return {body: songsDto, status:200};

    }catch(err){
        return {status:404, message:err}
    }
}

const getAllByAlbumId = async (albumId) =>{
    try{

        const songs = await SongRepository.findAllByAlbumId(albumId);
        const songsDto = []
        for(let song of songs){
            songsDto.push({
                id:song._id,
                name:song.name,
                path:song.path,
                number:song.number,
                duration:song.duration,
                released:song.released,
                album:song.album,
            })
        }
   
        return {body: songsDto, status:200};
    }catch(err){
        return {status:404, message:err}
    }
}


module.exports = {
    saveSong,
    getAll,
    getAllByAlbumId,
    getOne
}
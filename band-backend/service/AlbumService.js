const {AlbumRepository, BandRepository, GenreRepository} = require("../repository/index");
const ImageService = require("../service/ImageService")
const Album = require("../models/Album");
const {getFile} = require("../drive/drive")

const saveAlbum = async (body) =>{
    try{

        const band = await BandRepository.findById(body.band);
        const genre = await GenreRepository.findById(body.genre);

        const newAlbum = Album({
            name:body.name,
            image:ImageService.convertBase64ToBinary(body.image),
            band:band,
            genre:genre,
        })
        if(body.year !== undefined || body.year !== "")
            newAlbum.year = body.year

            

        const savedAlbum = await AlbumRepository.saveAlbum(newAlbum);

        return {
            body:{
                id: savedAlbum._id,
                name:savedAlbum.name,
                image:savedAlbum.image,
                year:savedAlbum.year,
                band:savedAlbum.band,
                genre:savedAlbum.genre,
            },
            status:200
        }

    }catch(err){
        return {status:404, message:err}
    }

};

const getOne = async (id) =>{
    try{
        const album = await AlbumRepository.findById(id);
        const band = await BandRepository.findById(album.band);
        const genre = await GenreRepository.findById(album.genre)
        const image = await getFile(album.image,"media", "image")

        return {
            body:{
                id: album._id,
                name:album.name,
                image:image,
                year:album.year,
                band:{
                    id:band._id,
                    name:band.name
                },
                genre:{
                    id:genre._id,
                    name:genre.name
                }
            },
            status:200
        }
    }catch(err){
        return {status:404, message:err}
    }
}

const getAll = async () =>{
    try{

        const albums = await AlbumRepository.findAll();
        const albumsDto = []
        for(let album of albums){
            albumsDto.push({
                id: album._id,
                name:album.name,
                image:album.image,
                year:album.year,
                band:album.band
            })
        }        
       
        return { status:200, body:albumsDto };

    }catch(err){
        return {status:404, message:err}
    }
}

const getAllByBandId = async (bandId) =>{
    try{

        const albums = await AlbumRepository.findAllByBandId(bandId);
        const albumsDto = []
        for(let album of albums){
            const image = await getFile(album.image,"media", "image")
            albumsDto.push({
                id: album._id,
                name:album.name,
                image:image,
                year:album.year,
                band:album.band
            })
        }
        return { status:200, body:albumsDto };

    }catch(err){
        return {status:404, message:err}
    }
}

module.exports = {
    saveAlbum,
    getAll,
    getAllByBandId,
    getOne
}
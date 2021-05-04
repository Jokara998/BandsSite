const {BandRepository, GenreRepository} = require("../repository/index")
const Band = require("../models/Band")
const ImageService = require("./ImageService")
const {getFile} = require("../drive/drive")

const saveBand = async (body) =>{
    try{

        let genre = []
        for(let genreName of body.genre){
            const g = await GenreRepository.findByName(body.genre);
            genre.push(g);
        }

        const newBand = Band({
            name:body.name,
            description:body.description,
            founded:body.founded,
            image:ImageService.convertBase64ToBinary(body.image),
            genre:genre
        })

        if( body.ended || body.ended !== undefined || body.ended !== "")
            newBand.ended = body.ended;

        const savedBand = await BandRepository.saveBand(newBand);

        return {
            body:{
                id: savedBand._id,
                name:savedBand.name,
                description:savedBand.description,
                founded:savedBand.founded,
                ended:savedBand.ended,
                date:savedBand.date,
                genre:savedBand.genre,
                image:savedBand.image,
            },
            status:200
        }
        
    }catch(err){
        return {status:404, message:err}
    }
}

const getOne = async (id) => {
    try{
        const band = await BandRepository.findById(id);
        const image = await getFile(band.image,"media", "image")
        console.log(image)

        return {
            body:{
                id: band._id,
                name:band.name,
                description:band.description,
                founded:band.founded,
                ended:band.ended,
                date:band.date,
                genre:band.genre,
                image:image,
            },
            status:200
        }
    }catch(err){
        return {status:404, message:err}
    }

}

const getAll = async () => {

    try{
        const bands = await BandRepository.findAll();
        const bandsDto = []

        bands.map(band=>{
            bandsDto.push({
                id: band._id,
                name:band.name,
                description:band.description,
                founded:band.founded,
                ended:band.ended,
                date:band.date,
                genre:band.genre,
                image:band.image,
            })
        })

        return { status:200, body: bandsDto};
    }catch(err){
        return {status:404, message:err}
    }

}

const getAllByGenreId = async (genreId) => {

    try{
        const bands = await BandRepository.findAllByGenreId(genreId);
        let bandsDto = []
        
        for(let band of bands){
            
            let bandDto = {
                id: band._id,
                name:band.name,
                description:band.description,
                founded:band.founded,
                ended:band.ended,
                date:band.date,
                image:band.image,
                genre:[],
            }
            for(let genreId of band.genre){
                const oneGenre = await GenreRepository.findById(genreId);
                bandDto.genre.push({id:oneGenre._id, name:oneGenre.name})
            }

            bandsDto.push(bandDto)
        }

        return { status:200, body: bandsDto};
    }catch(err){
        return {status:404, message:err}
    }

}

const addMusicianToBand = async (id, body) =>{
    try{
        // add musician to band via update repo method
        const bandPatch = await BandRepository.addMusicianToBand(id, body.musicianId);
        return {
            status:200,
            body:"Musician added!"
        }
    }catch(err){
        return {status:404, message:err}
    }
}

module.exports = {
    saveBand,
    getAll,
    getAllByGenreId,
    getOne,
    addMusicianToBand,
}


const {MusicianRepository, BandRepository} = require("../repository/index");
const Musician = require("../models/Musician");
const ImageService = require("./ImageService")
const {getFile} = require("../drive/drive")


const saveMusician = async (body) =>{
    try{
        const newMusician = Musician({
            name:body.name,
            surname:body.surname,
            instrument:body.instrument,
            occupation:body.occupation,
            image:ImageService.convertBase64ToBinary(body.image),
            born:body.born,
        })

        if( body.died || body.died !== undefined || body.died !== "")
            newMusician.died = body.died;


        const savedMusician = await MusicianRepository.saveMusician(newMusician);
        
        return {
            body:{
                name:savedMusician.name,
                surname:savedMusician.surname,
                instrument:savedMusician.instrument,
                occupation:savedMusician.occupation,
                born:savedMusician.born,
                id:savedMusician._id,
                image:savedMusician.image
            },
            status:200
        }

    }catch(err){
        return {status:404, message:err}
    }
}

const getOne = async (id) =>{
    try{
        const musician = await MusicianRepository.findById(id);
        let bandsDto = []
        for(let bandId of musician.bands){
            const band = await BandRepository.findById(bandId);
            bandsDto.push({
                name:band.name,
                id:band._id
            })
        }

        const image = await getFile(musician.image, "media", "image")

        return {
            body:{
                name:musician.name,
                surname:musician.surname,
                instrument:musician.instrument,
                occupation:musician.occupation,
                born:musician.born,
                died:musician.died,
                image:image,
                id:musician._id,
                bands:bandsDto,
            },
            status:200
        }
    }catch(err){    
        return {status:404, message:err}
    }
    
}

const getAll = async () =>{
    try{
        const musicians = await MusicianRepository.findAll();
        const musiciansDto = []
        musicians.map(musician => {
            musiciansDto.push({
                name:musician.name,
                surname:musician.surname,
                instrument:musician.instrument,
                occupation:musician.occupation,
                born:musician.born,
                image:musician.image,
                died:musician.died,
                id:musician._id
            })
        })
        return { body: musiciansDto, status:200} ;
    }catch(err){    
        return {status:404, message:err}
    }
}

const getAllByBandId = async (bandId) =>{
    try{
        const musicians = await MusicianRepository.findAllbyBandId(bandId);
        let musiciansDto = []
        for(let musician of musicians){
            musiciansDto.push({
                name:musician.name,
                surname:musician.surname,
                instrument:musician.instrument,
                occupation:musician.occupation,
                born:musician.born,
                died:musician.died,
                image:musician.image,
                id:musician._id
            })
        }
        
        return { body: musiciansDto, status:200} ;
    }catch(err){    
        return {status:404, message:err}
    }
}

const addMusicianToBand = async (id, body) =>{
    try{
        const musicianPatch = await MusicianRepository.addMusicianToBand(id, body.musicianId);
        return {
            status:200,
            body:"Band added!"
        }
    }catch(err){
        return {status:404, message:err}
    }
}

module.exports = {
    saveMusician,
    getAll,
    getAllByBandId,
    getOne,
    addMusicianToBand,

}
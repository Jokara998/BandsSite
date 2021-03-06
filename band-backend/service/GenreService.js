const {GenreRepository, BandRepository} = require("../repository/index")
const Genre = require("../models/Genre")

const saveGenre = async (body) =>{
    try{
        const genre = await GenreRepository.findByName(body.name);
        if(genre){
            return { status:409, message:"Genre already exist!"}
        }

        const newGenre = Genre({
            name:body.name,
            description:body.description,
        })

        const savedGenre = await GenreRepository.saveGenre(newGenre);

        return {
            body:{
                id:savedGenre._id,
                name:savedGenre.name,
                description:savedGenre.description,
                date:savedGenre.date,
            },
            status:200
        }
        
    }catch(err){
        return { status:404, message:err}
    }
}

const updateOne = async (id, body) =>{
    try{

        const genre = await GenreRepository.findByName(body.name);
        if(genre && genre._id == id){
            return { status:409, message:"Genre name is already used!"}
        }

        const updatedGenre = await GenreRepository.updateById(id, body.name, body.description);
        return {
            message:"Genre Updated!",
            status:200
        }
        
    }catch(err){
        return { status:404, message:err}
    }
}

const deleteOne = async (id) =>{
    try{

        const bands = await BandRepository.findAllByGenreId(id);
        if(bands.length >= 1)
            return {
                message:"Genre contains bands and can not be deleted!",
                status:409
            }
        
        const deletedGenre = await GenreRepository.deleteById(id);
        return {
            message:"Genre Deleted!",
            status:200
        }
        
    }catch(err){
        return { status:404, message:err}
    }
}

const getOne = async (id) =>{
    try{

        const genre = await GenreRepository.findById(id);

        return {
            body:{
                id:genre._id,
                name:genre.name,
                description:genre.description,
                date:genre.date,
            },
            status:200
        }
        
    }catch(err){
        return { status:404, message:err}
    }
}

const getAll = async () =>{
    try{

        const genres = await GenreRepository.findAll();
        let dtoGenres = []
        genres.map(genre => {
            dtoGenres.push({
                id:genre._id,
                name:genre.name,
                description:genre.description,
                date:genre.date,
            })
        })

        return { status:200, body:dtoGenres };
        
    }catch(err){
        return { status:404, message:err}
    }
}

module.exports = {
    saveGenre,
    getOne,
    getAll,
    deleteOne,
    updateOne,
}


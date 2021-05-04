const Genre = require("../models/Genre")

const saveGenre = async (genre) =>{
    const savedGenre = await genre.save();
    return findById(savedGenre._id);
}

const findById = async (id) => {
    const genre = await Genre.findById(id);
    return genre;
}

const findByName = async (name) => {
    const genre = await Genre.findOne({name:name});
    return genre;
}

const findAll = async () =>{
    const genres = await Genre.find();
    return genres;
}


module.exports = {
    saveGenre,
    findById,
    findByName,
    findAll,
}
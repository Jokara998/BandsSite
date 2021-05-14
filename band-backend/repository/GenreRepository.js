const Genre = require("../models/Genre")

const saveGenre = async (genre) =>{
    const savedGenre = await genre.save();
    return findById(savedGenre._id);
}

const deleteById = async (id) => {
    try{
        const genre = await Genre.findById(id);
        const idd = genre._id
        const deletedGenre = await Genre.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
};

const updateById = async (id, name, description) => {
    const updatedGenre =  await Genre.updateOne(
        { _id: id},
        { $set:
            {
                name: name,
                description:description
            }
        }
    );
    const genre = await Genre.findById(id);
    return genre;
};

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
    updateById,
    deleteById,
    findById,
    findByName,
    findAll,
}
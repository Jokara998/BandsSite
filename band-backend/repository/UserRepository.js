const User = require("../models/User")

const saveUser = async (newUser) =>{
    const savedUser = await newUser.save();
    return findById(savedUser._id);
}

const findById = async (id) =>{
    const user = await User.findById(id);
    return user;
}

const findByUsername = async (username) =>{
    const user = await User.findOne({username:username});
    return user;
}

module.exports = {
    saveUser,
    findById,
    findByUsername
}
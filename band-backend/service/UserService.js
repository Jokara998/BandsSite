const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv/config")
const {UserRepository} = require("../repository/index")
const User = require("../models/User")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword;
}


const login = async (req) =>{
    try{
        const user = await UserRepository.findByUsername(req.body.username);
        if(!user){
            return { status:401, message:"Username or password wrong!"};
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword){
            return { status:401, message:"Username or password wrong!"};
        }

        const token = jwt.sign({username:user.username, type:user.type}, process.env.SECRET);
        return { status:202, message:"Logged in!", token:token};

    }catch(err){
        return { status:404, message:err};
    }
}

const register = async (req) =>{
    try{

        const user = await UserRepository.findByUsername(req.body.username);
        if(user){
            return { status:409, message:"Username already exist!"}
        }

        // hash password
        const hashPass = await hashPassword(req.body.password)

        const newUser = User({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: hashPass,
            type: "Client",
        })

        const savedUser = await UserRepository.saveUser(newUser)
        return { status:200, message:"Registration successful!"}

    }catch(err){
        return { status:409, message:err}

    }
}

const getOneId = async (id) =>{
    try{
        const user = await UserRepository.findById(id);
        return {
            body:{
                id:user._id,
                name:user.name,
                surname:user.surname,
                username:user.surname,
                type:user.type
            },
            status:200,
        }
    }catch(err){
        return { status:404, message:err};
    }
}

const getOneUsername = async (username) =>{
    try{
        const user = await UserRepository.findByUsername(username);
        return {
            body:{
                id:user._id,
                name:user.name,
                surname:user.surname,
                username:user.surname,
                type:user.type
            },
            status:200
        }
    }catch(err){
        return { status:404, message:err};
    }
}

module.exports = {
    login,
    register,
    getOneId,
    getOneUsername    
}
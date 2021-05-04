const express = require("express");
const router = express.Router();
const {UserService} = require("../service/index")
const auth = require("../auth/auth")

router.get(
    "/auth",
    auth,
    async (req,res) => {
        try{
            const user = req.user;
            res.status(200).json({loggedIn:true, username:user.username, type:user.type});
        }catch(err){
            res.status(404).json({message:err})
        }
    }
)

router.post(
    "/login",
    async (req,res)=>{
        try{
            const response = await UserService.login(req);
            if(response.status == 202)
                res.status(response.status).cookie('authcookie', response.token, {maxAge:14400000 , httpOnly:true, sameSite:"strict", secure:true}).json({message:response.message});
            else
                res.status(response.status).json({message:response.message})


        }catch(err){
            res.status(404).json({message:err})
        }
    }
)

router.post(
    "/register",
    async (req,res)=>{
        try{
            const response = await UserService.register(req);
            res.status(response.status).json({message:response.message});
        }catch(err){
            res.status(404).json({message:err})
        }
    }
)

router.get(
    "/logout",
    async (req,res)=>{
        try{
            res.status(200).clearCookie("authcookie").json({message:"Logged out!"});
        }catch(err){
            res.status(404).json({message:err})
        }
    }
)

router.get(
    "/:id",
    async (req,res)=>{
        try{
            const response = await UserService.getOneId(req.params.id);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});

        }catch(err){
            res.status(404).json({message:err})
        }
    }
)

router.get(
    "/username/:username",
    auth,
    async (req,res)=>{
        try{
            const response = await UserService.getOneUsername(req.params.username);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});
        }catch(err){
            res.status(404).json({message:err})
        }
    }
)


module.exports = router;
const express = require("express");
const router = express.Router();
const {PlaylistService} = require("../service/index")
const auth = require("../auth/auth")

router.post(
    "/",
    auth,
    async (req,res) =>{
        try{
            const response = await PlaylistService.savePlaylist(req.user.username, req.body);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});

        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

router.put(
    "/:id",
    auth,
    async (req,res) =>{
        try{
            const response = await PlaylistService.updatePlaylist(req.params.id, req.body);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});

        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

router.delete(
    "/:id",
    auth,
    async (req,res) =>{
        try{
            const response = await PlaylistService.deletePlaylist(req.params.id);
            res.status(response.status).json({message:response.message});

        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

router.get(
    "/:id",
    auth,
    async (req,res) =>{
        try{
            const response = await PlaylistService.findById(req.params.id);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});

        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

router.get(
    "/",
    auth,
    async (req,res) =>{
        try{
            const response = await PlaylistService.findAllByUsername(req.user.username);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});

        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

module.exports = router;
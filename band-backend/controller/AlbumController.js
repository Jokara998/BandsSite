const express = require("express");
const router = express.Router();
const {AlbumService, SongService} = require("../service/index")

router.post(
    "/",
    async (req,res) =>{
        try{
            const response = await AlbumService.saveAlbum(req.body);
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
    "/:id",
    async (req,res) =>{
        try{
            const response = await AlbumService.getOne(req.params.id)
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
    "/:id/song",
    async (req,res) =>{
        try{
            const response = await SongService.getAllByAlbumId(req.params.id);
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
    async (req,res) =>{
        try{
            const response = await AlbumService.getAll();
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
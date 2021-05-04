const express = require("express");
const router = express.Router();
const {SongService} = require("../service/index")

router.post(
    "/",
    async (req,res) =>{
        try{
            const response = await SongService.saveSong(req.body);
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
            const response = await SongService.getOne(req.params.id);
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
            const response = await SongService.getAll();
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
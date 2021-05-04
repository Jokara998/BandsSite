const express = require("express");
const router = express.Router();
const {BandService, MusicianService, AlbumService} = require("../service/index")


router.post(
    "/",
    async (req, res) =>{
        try{
            const response = await BandService.saveBand(req.body);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});
        }catch(err){
            res.status(404).json({message:err});
        }
    }
);

router.get(
    "/:id",
    async (req, res) =>{
        try{
            const response = await BandService.getOne(req.params.id);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});
        }catch(err){
            res.status(404).json({message:err});
        }
    }

)

// GET BAND MEMBERS
router.get(
    "/:id/musician",
    async (req, res) =>{
        try{
            const response = await MusicianService.getAllByBandId(req.params.id);
            if(response.status == 200)
                res.status(response.status).json(response.body);
            else
                res.status(response.status).json({message:response.message});
        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

// ADD MUSICIAN TO SPECIFIC BAND
router.patch(
    "/:id/musician",
    async (req, res) =>{
        try{
            const responseBand = await BandService.addMusicianToBand(req.params.id, req.body);
            const responseMusician = await MusicianService.addMusicianToBand(req.params.id, req.body);
            if(responseBand.status == 200 && responseMusician.status == 200)
                res.status(200).json("Musician added to Band!");
            else if(responseBand.status != 200)
                res.status(responseBand.status).json({message:responseBand.message});
            else if(responseMusician.status != 200)
                res.status(responseMusician.status).json({message:responseMusician.message});
        }catch(err){
            res.status(404).json({message:err});
        }
    }
)

router.get(
    "/:id/album",
    async (req, res) =>{
        try{
            const response = await AlbumService.getAllByBandId(req.params.id);
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
    async (req, res) =>{
        try{
            const response = await BandService.getAll();
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
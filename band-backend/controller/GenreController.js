const express = require("express");
const router = express.Router();
const {GenreService, BandService} = require("../service/index")


router.post(
    "/",
    async (req, res) =>{
        try{
            const response = await GenreService.saveGenre(req.body);
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
            const genreResponse = await GenreService.getOne(req.params.id);
            const bandsResponse = await BandService.getAllByGenreId(req.params.id);
            if(genreResponse.status == 200 && bandsResponse.status == 200){
                const body = genreResponse.body;
                body.bands = bandsResponse.body;
                res.status(200).json(body)
            }else if(genreResponse.status == 200 && bandsResponse.status != 200){
                res.status(bandsResponse.status).json({message:bandsResponse.message})
            }else if(genreResponse.status != 200 && bandsResponse.status == 200){
                res.status(genreResponse.status).json({message:genreResponse.message})
            }else{
                res.status(404).json({message:genreResponse.message});
            }
        }catch(err){
            res.status(404).json({message:err});
        }
    }

)

router.get(
    "/:id/band",
    async (req, res) =>{
        try{
            const response = await BandService.getAllByGenreId(req.params.id);
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
    async (req,res) => {
        try{
            const response = await GenreService.getAll();
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
import React, {useEffect, useState} from "react"
import axios from "../axios/index"
import {Container} from "@material-ui/core"
import useStyles from "../assets/styles"
import GenreCard from "../components/genre/GenreCard"
import Loader from "../components/Loader"

const Genres = () =>{
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const [loader, setLoader] = useState(true);


    const getGenres = async () =>{
        await axios.get("/genre")
        .then(response=>{
            setGenres(response.data);
            setLoader(false)
        }).catch(()=>{
            setGenres([]);
            setLoader(false)
        })
    }

    useEffect(()=>{
        getGenres();
    },[])

    return(
        <div className={classes.font}>
            {
                loader ? <Loader open={loader} title={"Loading..."} /> :
                <div>
                    <h1 style={{color:"#f5f5f5"}}> Genres </h1>
                    { 
                        genres.length === 0 ? <h2 style={{color:"#f5f5f5", marginTop:"30px"}}> No genres available! </h2> :
                        <Container className={classes.genreContainer}>
                            {genres.map( genre => (
                                <GenreCard key={genre.id} genre={genre} />
                            ))}
                        </Container>
                    }
                </div>
            }
        </div>
    )
}

export default Genres;
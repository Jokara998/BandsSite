import React, {useState, useEffect} from "react"
import useStyles from "../assets/styles"
import axios from "../axios/index"
import Loader from "../components/Loader"
import {Container} from "@material-ui/core"
import AlbumCard from "../components/album/AlbumCard"

const Albums = ({match}) =>{
    const classes = useStyles();
    const [albums, setAlbums] = useState([]);
    const [band, setBand] = useState({
        id: "",
        name:"",
        description:"",
        founded:"",
        ended:"",
        genre:"",
        image:[],
    });
    const [loader, setLoader] = useState(true);

    const getAlbums = async () =>{
        await axios.get("/band/"+match.params.id+"/album")
        .then(response=>{
            setAlbums(response.data);
            getBand();
        })
        .catch(()=>{
            setAlbums([]);
            setBand({
                id: "",
                name:"",
                description:"",
                founded:"",
                ended:"",
                genre:"",
                image:[],
            });
            setLoader(false);

        })
    }

    const getBand = async () =>{
        await axios.get("/band/"+match.params.id)
        .then(response=>{
            setBand(response.data);
            setLoader(false);
        })
        .catch(()=>{
            setBand({
                id: "",
                name:"",
                description:"",
                founded:"",
                ended:"",
                genre:"",
                image:[],
            });
            setLoader(false);
        })
    }

    useEffect(()=>{
        getAlbums();
    },[])
    

    return(
        <div className={classes.font}>

            {
                loader ? <Loader open={true} title={"Loading..."} /> : 
                <Container>
                   <h1 style={{color:"whitesmoke"}}> {band.name} Albums </h1>
                    { 
                        albums.length === 0 ? <h2 style={{color:"#f5f5f5", marginTop:"30px"}}> No albums available! </h2> :
                        <Container className={classes.albumsContainer}>
                            {
                                albums.map(album=>(<AlbumCard key={album.id} album={album} band={band}/>))
                            }     
                        </Container>
                    }
                </Container>
            
            }

        </div>
    )
}

export default Albums;
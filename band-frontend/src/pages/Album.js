import React, {useState, useEffect} from "react"
import useStyles from "../assets/styles"
import axios from "../axios/index"
import Loader from "../components/Loader"
import {Container,Card, ListItem, List, Grid} from "@material-ui/core"
import img from "../assets/noimg.jpg"
import SongCard from "../components/song/SongCard"

const Album = ({match}) =>{
    const classes = useStyles();
    const [loader, setLoader] = useState(true);
    const [album, setAlbum] = useState({
        id: "",
        name:"",
        image:"",
        year:"",
        band:{
            id:"",
            name:""
        },
        genre:{
            id:"",
            name:""
        }
    })
    const [songs, setSongs] = useState([]);

    const getAlbum = async () =>{
        await axios.get("/album/"+match.params.id)
        .then(response =>{
            setAlbum(response.data);
            getSongs(response.data.id);
        })
        .catch(()=>{
            setAlbum({
                id: "",
                name:"",
                image:"",
                year:"",
                band:{
                    id:"",
                    name:""
                },
                genre:{
                    id:"",
                    name:""
                }
            })
            setLoader(false);
        })
    }

    const getSongs = async (id) =>{
        await axios.get("/album/"+match.params.id+"/song")
        .then(response =>{
            setSongs(response.data);
            localStorage.setItem("songs", JSON.stringify(response.data))
            localStorage.setItem("type", "album")
            setLoader(false);
        })
        .catch(()=>{
            setSongs([])
            setLoader(false);
        })
    }

    useEffect(()=>{
        getAlbum();
    },[])

    return(
        <div className={classes.font}>

        {
            loader ? <Loader open={true} title={"Loading..."} /> : 
            <Container className={classes.albumPageContainer}>
                <Card className={classes.albumPageCard}> 
                    <Grid container sm={12}>
                        <Grid container sm={6}>
                            <Card className={classes.albumPageCard1}> 
                                <div className={classes.albumPageHeader}> 
                                    <ListItem dense={true} style={{color:"whitesmoke", fontSize:"18px"}}>Album</ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"14px"}}>{album.name}</ListItem>
                                    <ListItem dense={true} style={{color:"whitesmoke", fontSize:"18px"}}>Artist</ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"14px"}}>{album.band.name}</ListItem>
                                    <ListItem dense={true} style={{color:"whitesmoke", fontSize:"18px"}}>Genre</ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"14px"}}>{album.genre.name}</ListItem>
                                    <ListItem dense={true} style={{color:"whitesmoke", fontSize:"18px"}}>Released</ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"14px"}}>{album.year}</ListItem>
                                </div>
                            </Card>
                        </Grid>
                        <Grid container sm={6}>
                            <Container className={classes.albumPageImageContainer}>
                                <div className={classes.albumPageImageBorder}>
                                    
                                    { 
                                        album.image || album.image !== "" ? 
                                        <img src={album.image} loading={img} className={classes.albumPageImage} />
                                        :<img src={img} loading={img} className={classes.albumPageImage} />
                                    }
                                </div>
                             </Container>       
                        </Grid>
                    </Grid>
                 
                    <Grid container sm={12}>
                       <Container className={classes.albumPageListContainer}>
                        { 
                            songs.length === 0 ? <h2 style={{color:"#f5f5f5", marginTop:"130px"}}> No songs available! </h2> :
                            <List className={classes.albumPageList}>
                                {songs.map(song=>(<SongCard key={song.id} song={song} album={album} />))}
                            </List>
                        }
                       </Container>
                    </Grid>
                </Card>
                    
            </Container>
        
        }

    </div>
    )
}

export default Album;
import React, {useState, useEffect} from "react"
import {Modal, Container, Card, Grid, CardContent, ListItem, IconButton} from '@material-ui/core'
import useStyles from "../../assets/styles"
import { mdiMusicCircleOutline, mdiCloseCircleOutline } from '@mdi/js'
import {Icon} from '@mdi/react';
import img from "../../assets/noimg.jpg"
import Loader from "../Loader"
import axios from "../../axios/index"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const SongPlayingCard = ({songId, open, handleClose}) =>{
    const classes = useStyles();
    const [loader, setLoader] = useState(true);

    const [song, setSong] = useState({
        id:"",
        name:"",
        path:"",
        band:{
            id:"",
            name:""
        },
        album:{
            id:"",
            name:"",
            image:""
        },
    })

    const getSong = async () =>{
        await axios.get("/song/"+songId)
        .then(response=>{
            setSong(response.data);
            setLoader(false);
        })
        .catch(()=>{
            setSong({
                id:"",
                name:"",
                path:"",
                band:{
                    id:"",
                    name:""
                },
                album:{
                    id:"",
                    name:""
                },
            })
            setLoader(false);
        })
    }

    const getNextSong = async (id) =>{
        await axios.get("/song/"+id)
        .then(response=>{
            setSong(response.data);
            setLoader(false);
        })
        .catch(()=>{
            setSong({
                id:"",
                name:"",
                path:"",
                band:{
                    id:"",
                    name:""
                },
                album:{
                    id:"",
                    name:""
                },
            })
            setLoader(false);
        })
    }

    const playNext = () =>{
        setLoader(true)
        const songsList = JSON.parse(localStorage.getItem("songs"));
        const type = localStorage.getItem("type");
        if(type === "album"){
            if(song.number === songsList.length){
                const nextSong = songsList.find(s => s.number === 1)
                getNextSong(nextSong.id);
            }else{
                const nextSong = songsList.find(s => s.number === song.number+1)
                getNextSong(nextSong.id);
            }
        }else if(type==="playlist"){
               
            const currentSong = songsList.find(s => s.song.id === song.id)
            if(currentSong.index === songsList.length){
                const nextSong = songsList.find(s => s.index === 1)
                getNextSong(nextSong.song.id);
            }else{
                const nextSong = songsList.find(s => s.index === currentSong.index+1)
                getNextSong(nextSong.song.id);
            }
              
        }

    }

    const playPrevious = () =>{
        setLoader(true)
        const songsList = JSON.parse(localStorage.getItem("songs"));
        const type = localStorage.getItem("type");
        if(type === "album"){
            if(song.number === 1){
                const nextSong = songsList.find(s => s.number === songsList.length)
                getNextSong(nextSong.id);
            }else{
                const nextSong = songsList.find(s => s.number === song.number-1)
                getNextSong(nextSong.id);
            }
        }else if(type==="playlist"){
               
            const currentSong = songsList.find(s => s.song.id === song.id)
            if(currentSong.index === 1){
                const nextSong = songsList.find(s => s.index === songsList.length)
                getNextSong(nextSong.song.id);
            }else{
                const nextSong = songsList.find(s => s.index === currentSong.index-1)
                getNextSong(nextSong.song.id);
            }
              
        }

    }

    useEffect(()=>{
        getSong();
    },[])

    return(
        <div> 
            {
                loader ? <Loader open={true} title={"Loading..."} /> : 
                    <Modal key={song.id} open={open} onClose={handleClose} className={classes.font}>
                    <Container className={classes.songPlayingContainer}>
                        <Card className={classes.songPlayingCard}>
                            <div className={classes.songPlayingHeader}>
                                <Icon className={classes.songPlayingIcon} path={mdiMusicCircleOutline} color="#f5f5f5"/>
                                <h5 className={classes.songPlayingText}> Now Playing </h5>
                                <IconButton onClick={handleClose} >
                                    <Icon className={classes.songPlayingCloseIcon} size={1.1}  path={mdiCloseCircleOutline}/>
                                </IconButton>
                            </div>
                            <CardContent>
                                <Grid container sm={12}>
                                    <Grid container sm={5}>
                                        <Container className={classes.songPlayingImageContainer}>
                                            <div className={classes.songPlayingImageBorder}>
                                                {
                                                    song.album.image || song.album.image !== "" ? 
                                                    <img src={song.album.image} loading={img} className={classes.songPlayingImage} />
                                                    : <img src={img} loading={img} className={classes.songPlayingImage} />
                                                }
                                            </div>
                                        </Container>       
                                    </Grid>
                                    <Grid container sm={7}>
                                        <Card className={classes.songPlayingCard1}> 
                                            <div className={classes.songPlayingPageHeader}> 
                                                <ListItem dense={true} style={{color:"whitesmoke", fontSize:"18px"}}>{song.name}</ListItem>
                                                <ListItem dense={true} style={{color:"whitesmoke", fontSize:"16px"}}>{song.album.name}</ListItem>
                                                <ListItem dense={true} style={{color:"whitesmoke", fontSize:"14px"}}>{song.band.name}</ListItem>
                                            </div>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid container sm={12}>
                                    <Container className={classes.playerContainer}>
                                
                                        {   
                                            song.path || song.path !== "" ? 
                                            <AudioPlayer
                                                className={classes.audioPlayer}
                                                src={song.path}
                                                autoPlay={true}
                                                onEnded={playNext}
                                                showSkipControls={true}
                                                onClickNext={playNext}
                                                onClickPrevious={playPrevious}
                                                customAdditionalControls={[]}
                                                
                                                // other props here
                                            /> : null
                                        }
                                   
                                    </Container>    
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container> 
                </Modal>  

            }   
        </div>
    );
}

export default SongPlayingCard;


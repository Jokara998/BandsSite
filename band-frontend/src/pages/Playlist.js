import React, {useState, useEffect, useContext} from "react"
import useStyles from "../assets/styles"
import axios from "../axios/index"
import Loader from "../components/Loader"
import {Container,Card, ListItem, List, Grid, IconButton, Tooltip} from "@material-ui/core"
import img from "../assets/playlist.jpg"
import SongCard from "../components/song/SongCard"
import {UserContext} from "../context/UserContext"
import getUserInfo from "../service/getUserInfo"
import Button from "../components/controls/Button"
import DeletePlaylist from "../components/DeletePlaylist"
import {useHistory} from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import SuccessMessage from "../components/SuccessMessage"

const Playlist = ({match}) =>{
    const classes = useStyles();
    const history = useHistory();
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useContext(UserContext);
    const [deleteModal, setDeleteModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [miniLoader, setMiniLoader] = useState(false);

    const [playlist, setPlaylist] = useState({
        id: "",
        name:"",
        image:"",
        songs:[],
    })

    const getUser = async () =>{
        const userInfo = await getUserInfo();
        setUser(userInfo);
        getPlaylist();
    }


    const getPlaylist = async () =>{
        await axios.get("/playlist/"+match.params.id)
        .then(response =>{
            setPlaylist(response.data);
            let songs = []
            response.data.songs.map((song, index) =>{
                songs.push({
                    song:song,
                    index:index+1,
                })
            })
            localStorage.setItem("songs", JSON.stringify(songs))
            localStorage.setItem("type", "playlist")

            setLoader(false);
        })
        .catch(()=>{
            setPlaylist({
                id: "",
                name:"",
                image:"",
                songs:[],
            })
            setLoader(false);
        })
    }



    const redirectPlaylist = () =>{
        history.push("/playlist")
    }

    const redirectEdit = () =>{
        history.push("/playlist/"+playlist.id+"/edit")
    }

    const errorClose = () =>{
        setError(false)
    }

    const deletePlaylistFun = async () =>{
        setMiniLoader(true);
        await axios.delete("/playlist/"+playlist.id)
        .then(response=>{
            setMiniLoader(false);
            setSuccess(true);
        })
        .catch(err=>{
            setMiniLoader(false);
            setErrorMessage(err.response.data.message);
            setError(true);
        })
    }

    useEffect(()=>{
        getUser();
    },[])

    return(
        <div className={classes.font}>

        {
            loader ? <Loader open={true} title={"Loading..."} /> : 
            <Container className={classes.playlistPageContainer}>
                <Card className={classes.albumPageCard}> 
                    <Grid container sm={12}>
                        <Grid container sm={4}>
                            <Container className={classes.playlistPageImageContainer}>
                                <div className={classes.playlistPageImageBorder}>
                                    <img src={img} className={classes.playlistPageImage} />
                                </div>
                             </Container> 
                        </Grid>
                        <Grid container sm={8}>
                            <Card className={classes.playlistPageCard1}> 
                                <div className={classes.playlistPageHeader}> 
                                    <ListItem dense={true} style={{color:"whitesmoke", fontSize:"24px"}}>{playlist.name}</ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"18px"}}>Created by <span style={{color:"#C11003",whiteSpace: "pre-wrap"}}> {user.username} </span> </ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"16px"}}>{playlist.songs.length} songs </ListItem>
                                    <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"16px", display:"flex"}}>
                                        <Button
                                            variant="text"
                                            className={classes.playlistButtonEdit}
                                            text="Edit"
                                            onClick={()=>{redirectEdit()}}
                                        />
                                        <span style={{color:"black"}}>{"_"}</span>
                                        <Button
                                            variant="text"
                                            className={classes.playlistButtonRemove}
                                            text="Delete"
                                            onClick={()=>setDeleteModal(true)}
                                        />
                                    </ListItem>

                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                 
                    <Grid item sm={12}>
                       <Container className={classes.albumPageListContainer}>
                            <List className={classes.albumPageList}>
                                {playlist.songs.map((song, index)=>(<SongCard key={song.id} song={song} index={index+1} />))}
                            </List>
                       </Container>
                    </Grid>
                </Card>
                    
            </Container>
        
        }
        {deleteModal ? <DeletePlaylist playlist={playlist} open={deleteModal} confirm={true} confirmFun={deletePlaylistFun} cancel={true} cancelFun={()=>setDeleteModal(false)} /> : null}
        {miniLoader ? <Loader key={"miniLoader"} open={miniLoader} title={"Proccesing request..."} /> : null}
        {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
        {success ? <SuccessMessage open={success} message={"Playlist deleted!"} confirm={true} confirmFun={redirectPlaylist} /> : null}
    </div>
    )
}

export default Playlist;
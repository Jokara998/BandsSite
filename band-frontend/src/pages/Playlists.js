import React, {useEffect, useContext, useState} from "react"
import useStyles from "../assets/styles"
import getUserInfo from "../service/getUserInfo"
import {UserContext} from "../context/UserContext"
import Loader from "../components/Loader"
import {useHistory} from "react-router-dom"
import axios from "../axios/index"
import {Container, Card, List} from "@material-ui/core"
import Button from "../components/controls/Button"
import PlaylistCard from "../components/playlist/PlaylistCard"

const Playlist = () =>{

    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useContext(UserContext);
    const [loader, setLoader] = useState(true);
    const [playlists, setPlaylists] = useState([]);

    const getUser = async () =>{
        const userInfo = await getUserInfo();
        if(!userInfo.loggedIn || userInfo.type !== "Client" || userInfo.username === "")
            history.push("/login");
        setUser(userInfo);
        getPlaylists();

    }

    const getPlaylists = async () =>{
        await axios.get("/playlist")
        .then(response=>{
            setPlaylists(response.data);
            setLoader(false)
        })
        .catch(()=>{
            setPlaylists([]);
            setLoader(false)
        })
    }

    useEffect(()=>{
        getUser();
    },[])

    return(
        <div className={classes.font}>

            {
                loader ? <Loader open={true} title={"Loading..."} /> : 
                <Container className={classes.bandPageContainer}>
                    <Card className={classes.bandPageCard}>
                        <div className={classes.bandPageHeader}> 
                            <h1>My Playlists</h1>
                                <Button
                                    variant="text"
                                    className={classes.playlistButton}
                                    text="New Playlist"
                                    onClick={()=>history.push("/playlist/new")}
                                />
                        </div>
                        <Container className={classes.albumPageListContainer}>
                            <List className={classes.playlistList}>
                                {playlists.map(playlist => (<PlaylistCard key={playlist.id} playlist={playlist} />))}         
                            </List>
                        </Container>
                    </Card>
                </Container>
            
            }

        </div>
    )
}

export default Playlist;
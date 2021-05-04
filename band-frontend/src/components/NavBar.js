import React, {useEffect, useContext, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {AppBar, Toolbar, Button, Grid, Container} from "@material-ui/core"
import useStyles from "../assets/styles"
import axios from "../axios/index"
import {UserContext} from "../context/UserContext"
import getUserInfo from "../service/getUserInfo"
import {Icon} from '@mdi/react';
import {mdiGuitarElectric, mdiMusicBoxMultiple, mdiAccountArrowRight, mdiAccountArrowLeft, mdiAccountPlus, mdiPlaylistMusicOutline} from "@mdi/js"
import Loader from "./Loader"

const NavBar = () =>{
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useContext(UserContext);
    const [loader, setLoader] = useState(false);


    const getUser = async () =>{
        const userInfo = await getUserInfo();
        setUser(userInfo);
        setLoader(false);
    }

    useEffect(()=>{
        getUser();
    },[])


    const logout = () =>{
        setLoader(true);
        axios.get("/user/logout")
        .then(response=>{
            setUser({
                loggedIn:false,
                type:"",
                username:""
            })
            setLoader(true);
            history.push("/")
        })
    }

    return(
        <Container className={classes.navContainer}> 
            <AppBar position="relative" className={classes.navAppBar}>    
                <Toolbar variant="dense" className={classes.navToolbar} >
                    <Link to="/" className={classes.navLink} > 
                        <Button className={classes.navButtonH}> <Icon size={1.5} path={mdiGuitarElectric} /> <span className={classes.navLinkH}> BandSite </span> </Button>
                    </Link>
                    <Grid className={classes.navGrid}/>
                    {
                        user.loggedIn && user.type==="Client" ? 
                        <Link to="/playlist" className={classes.navLink}> 
                            <Button className={classes.navButton}> <Icon size={1} path={mdiPlaylistMusicOutline} /> <span className={classes.navLink}> Playlists </span></Button>
                        </Link> : null
                    }

                    <Link to="/genre" className={classes.navLink}> 
                        <Button className={classes.navButton}> <Icon size={1} path={mdiMusicBoxMultiple} /> <span className={classes.navLink}> Genres </span> </Button>
                    </Link>  

                    {
                        user.loggedIn ? null :   
                        <Link to="/login" className={classes.navLink}> 
                            <Button className={classes.navButton}> <Icon size={1} path={mdiAccountArrowLeft} /> <span className={classes.navLink}> Login </span></Button>
                        </Link> 
                    }
                    {
                        user.loggedIn ? null : 
                        <Link to="/register" className={classes.navLink}> 
                            <Button className={classes.navButton}> <Icon size={1} path={mdiAccountPlus} />  <span className={classes.navLink}> Register </span> </Button>
                        </Link>
                    }
                    {
                        user.loggedIn ?   
                        <Link to="/logout" className={classes.navLink}> 
                            <Button onClick={logout} className={classes.navButton}> <Icon size={1} path={mdiAccountArrowRight} />  <span className={classes.navLink}> Logout </span> </Button>
                        </Link> : null   
                      
                    }                   
            </Toolbar>
            </AppBar>
            {loader ? <Loader/> : null}
        </Container>
    )
}

export default NavBar;
import React, {useEffect, useContext, useState} from "react"
import {Icon} from '@mdi/react';
import {mdiFacebook, mdiInstagram, mdiYoutube, mdiTwitter} from "@mdi/js"
import useStyles from "../assets/styles"
import getUserInfo from "../service/getUserInfo"
import {UserContext} from "../context/UserContext"
import Loader from "../components/Loader"

const Homepage = () =>{

    const classes = useStyles();
    const [user, setUser] = useContext(UserContext);
    const [loader, setLoader] = useState(true);

    const getUser = async () =>{
        const userInfo = await getUserInfo();
        setUser(userInfo);
        setLoader(false)
    }

    useEffect(()=>{
        getUser();
    },[])

    return(
        <div>
            {
                loader ? <Loader open={loader} title={"Loading..."} /> : 
                <div> 
                    <div className={classes.homepageWelcome}>
                        {   
                            user.loggedIn ? <h1 style={{color:"whitesmoke"}}> Welcome <span style={{color:"#C11003"}}> {user.username} </span> to BandSite! </h1>
                            : <h1 style={{color:"whitesmoke"}}> Welcome to BandSite! </h1>
                        }
                        <h2 style={{color:"whitesmoke"}}> Post your music and get discovered or explore new music! </h2>
                    </div>
                    
                    <div className={classes.homepageSocialFollow}>
                        <h3 style={{color:"whitesmoke", fontSize:"25px"}} >Social Follow</h3>
                        <div className={classes.homepageSocialFollowBody}> 
                            <a href="https://www.facebook.com/" className={classes.homepageLink}>
                                <Icon size={1.1} path={mdiFacebook} />
                            </a>
                            <a href="https://www.instagram.com/" className={classes.homepageLink}>
                                <Icon size={1.1} path={mdiInstagram} />
                            </a>
                            <a href="https://www.youtube.com" className={classes.homepageLink}>
                                <Icon size={1.1} path={mdiYoutube} />
                            </a>
                            <a href="https://www.twitter.com/" className={classes.homepageLink}>
                                <Icon size={1.1} path={mdiTwitter} />
                            </a>  
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Homepage;
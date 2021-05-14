import React, {useEffect, useContext, useState} from "react"
import {Icon} from '@mdi/react';
import {mdiFacebook, mdiInstagram, mdiYoutube, mdiTwitter} from "@mdi/js"
import useStyles from "../assets/styles"
import {UserContext} from "../context/UserContext"

const Homepage = () =>{

    const classes = useStyles();
    const [user, setUser] = useContext(UserContext);

    return(
        <div>
            
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
                        <a href="https://www.facebook.com/" target = "_blank" className={classes.homepageLink}>
                            <Icon size={1.1} path={mdiFacebook} />
                        </a>
                        <a href="https://www.instagram.com/" target = "_blank" className={classes.homepageLink}>
                            <Icon size={1.1} path={mdiInstagram} />
                        </a>
                        <a href="https://www.youtube.com" target = "_blank" className={classes.homepageLink}>
                            <Icon size={1.1} path={mdiYoutube} />
                        </a>
                        <a href="https://www.twitter.com/" target = "_blank" className={classes.homepageLink}>
                            <Icon size={1.1} path={mdiTwitter} />
                        </a>  
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Homepage;
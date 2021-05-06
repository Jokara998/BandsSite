import React, {useState} from "react"
import {Card, ListItem, Grid, Container, IconButton, Tooltip } from "@material-ui/core"
import useStyles from "../../assets/styles"
import {Link} from "react-router-dom"
import { mdiArrowRightBoldCircleOutline } from '@mdi/js'
import {Icon} from '@mdi/react';
import img from "../../assets/playlist.jpg"

const PlaylistCard = ({playlist}) =>{
    const classes = useStyles();
    
    const itemStyle = {
        marginTop:"3px",
    }

    return (
       <ListItem className={classes.playlistItem}>
           <Card className={classes.playlistCard}>
                <Grid container sm={12}>
                    <Grid container sm={3}>
                        <Container className={classes.playlistImageContainer}>
                            <div className={classes.playlistImageBorder}>
                                <img src={img} className={classes.playlistImage} />
                            </div>
                        </Container>       
                    </Grid>
                    <Grid container sm={6}>
                        <Card className={classes.playlistCard1}> 
                            <div className={classes.songPlayingPageHeader}> 
                                <ListItem dense={true} style={{color:"whitesmoke", fontSize:"17px"}}>{playlist.name}</ListItem>
                                <ListItem dense={true} style={{color:"#B6B6B6", fontSize:"14px"}}>{playlist.songs.length} songs</ListItem>
                            </div>
                        </Card>
                    </Grid>
                    <Grid container sm={3}>
                        <Link to={`/playlist/${playlist.id}`}>
                            <Tooltip  title={<h2 className={classes.tooltip}>Open playlist?</h2>} placement="right" arrow>
                                <IconButton style={{marginLeft:"-10px"}}>
                                    <Icon className={classes.playlistArrowIcon} size={1.3}  path={mdiArrowRightBoldCircleOutline}/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Grid>
                </Grid>
           </Card>
       </ListItem>
    );
}

export default PlaylistCard;
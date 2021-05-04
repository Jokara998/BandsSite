import React, {useState} from "react"
import {Card, ListItem, Grid, IconButton, Tooltip } from "@material-ui/core"
import useStyles from "../../assets/styles"
import {Link} from "react-router-dom"
import {Icon} from '@mdi/react';
import {mdiMotionPlay} from "@mdi/js"
import SongPlayingCard from "../song/SongPlayingCard"

const SongCard = ({song, index, album}) =>{
    const classes = useStyles();
    const [modal, setModal] = useState(false)
    

    const itemStyle = {
        marginTop:"3px",
    }

    const closeModal = () =>{
        setModal(false);
    }
    
    return (
       <ListItem className={classes.songListItem}>
           <Card className={classes.songCard}>
               <Grid sm={1} style={itemStyle}> {index ? index : song.number}. </Grid>
               <Grid sm={7} style={itemStyle}> {song.name} </Grid>
               <Grid sm={2} style={itemStyle}> {song.duration} </Grid>
               <Grid sm={2} style={{display:"flex", justifyContent:"center", alignText:"left"}}>
                    <Tooltip title="Open song player?" placement="right" arrow className={classes.tooltip}>
                        <IconButton onClick={()=>setModal(true)}> 
                            <Icon className={classes.songCardIcon} size={1.2} path={mdiMotionPlay} /> 
                        </IconButton>  
                    </Tooltip>
                </Grid>
           </Card>
           {modal ? <SongPlayingCard open={modal} songId={song.id} handleClose={closeModal} /> : null}
       </ListItem>
    );
}

export default SongCard;
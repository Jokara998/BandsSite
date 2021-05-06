import React, {useState} from "react"
import {Card, ListItem, Grid, IconButton, Tooltip } from "@material-ui/core"
import useStyles from "../../../assets/styles"
import {Icon} from '@mdi/react';
import {mdiSquareEditOutline, mdiDeleteOutline, mdiTableSearch} from "@mdi/js"

const GenreDashCard = ({genre, index}) =>{
    const classes = useStyles();

    const itemStyle = {
        marginTop:"3px",
    }

    return (
       <ListItem className={classes.songListItem}>
           <Card className={classes.songCard}>
               <Grid sm={1} style={itemStyle}> {index}. </Grid>
               <Grid sm={8} style={itemStyle}> {genre.name} </Grid>
               <Grid sm={3} style={{display:"flex", justifyContent:"center", alignText:"left"}}>
                    <Tooltip title={<h2 className={classes.tooltip}>Edit Genre?</h2>} placement="top" arrow>
                        <IconButton onClick={()=>{}}> 
                            <Icon className={classes.songCardIcon} size={1.2} path={mdiSquareEditOutline} /> 
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title={<h2 className={classes.tooltip}>Remove Genre?</h2>}  placement="top" arrow>
                        <IconButton onClick={()=>{}}> 
                            <Icon className={classes.songCardIcon} size={1.2} path={mdiDeleteOutline} /> 
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title={<h2 className={classes.tooltip}>View Genre Bands?</h2>}  placement="top" arrow>
                        <IconButton onClick={()=>{}}> 
                            <Icon className={classes.songCardIcon} size={1.2} path={mdiTableSearch} /> 
                        </IconButton>  
                    </Tooltip>
                </Grid>
           </Card>
       </ListItem>
    );
}

export default GenreDashCard;
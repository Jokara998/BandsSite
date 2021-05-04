import React, {useState, useEffect} from "react"
import {Grid, ListItem, Card, CardContent} from "@material-ui/core"
import useStyles from "../../assets/styles"
import {Link} from "react-router-dom"
import img from "../../assets/headphones.jpg"


const AlbumCard = ({album, band}) =>{
    const classes = useStyles();

    return(
        <Grid sm={6} spacing={6}>
            <Card key={album.id} className={classes.albumCard} >
                <div className={classes.albumImageBorder}>
                    { 
                        album.image || album.image !== "" ? 
                        <img src={album.image} loading={img} className={classes.albumImage} />
                        :<img src={img} loading={img} className={classes.albumImage} />
                    }
                </div>
                <CardContent>
                    <Link to={`/album/${album.id}`} className={classes.albumLink}>
                        <ListItem >{album.name}</ListItem>
                    </Link>
                    <Link to={`/band/${band.id}`} className={classes.bandLink}>
                        <ListItem>{band.name}</ListItem>
                    </Link>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AlbumCard;
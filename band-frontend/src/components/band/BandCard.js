import React from "react"
import {Grid, Card, CardActions, CardContent } from "@material-ui/core"
import useStyles from "../../assets/styles"
import Button from "../controls/Button"
import {Link} from "react-router-dom"

const BandCard = ({band}) =>{
    const classes = useStyles();
  
    return (
        <Card key={band.id} className={classes.bandCard}>
            <h2 className={classes.bandHeader}>{band.name}</h2> 
            <CardContent style={{display:"grid", justifyItems:"start"}}>
                <p className={classes.bandP1}> Years Active: {band.founded}-{band.ended} </p>
                <p className={classes.bandP2}> Bio: {band.description} </p>
            </CardContent>
            <CardActions className={classes.bandActions}>
                <Link to={`/band/${band.id}`}  className={classes.link}>
                    <Button className={classes.bandButton} text={"Go to Band Page"} />
                </Link>
            </CardActions>
        </Card>
    );
}

export default BandCard;
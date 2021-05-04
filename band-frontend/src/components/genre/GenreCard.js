import React from "react"
import {Card, CardActions, CardContent } from "@material-ui/core"
import useStyles from "../../assets/styles"
import Button from "../controls/Button"
import {Link} from "react-router-dom"
import img from "../../assets/headphones.jpg"

const GenreCard = ({genre}) =>{
    const classes = useStyles();

    const genreCard = {
        width: "220px",
        height: "260px",
        padding: "20px 20px",
        margin:"20px",
        borderRadius:"10px",
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border:"1px solid #f5f5f5",
    };

    return (
        <Card key={genre.id} style={genreCard}>
            <h2 className={classes.genreHeader}>{genre.name}</h2> 
            <CardContent>
                <p className={classes.genreP}> {genre.description} </p>
            </CardContent>
            <CardActions className={classes.genreActions}>
                <Link to={`/genre/${genre.id}/band`} className={classes.link}>
                    <Button className={classes.genreButton} text={"See Bands"} />
                </Link>
            </CardActions>
        </Card>
    );
}

export default GenreCard;
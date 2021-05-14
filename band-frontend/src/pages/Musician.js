import React, {useState, useEffect} from "react"
import {Container, Grid, Card, ListItem, List, CardContent } from "@material-ui/core"
import axios from "../axios/index"
import Loader from "../components/Loader"
import useStyles from "../assets//styles"
import img from "../assets/noimg.jpg"
import {Link} from "react-router-dom"
import {Icon} from '@mdi/react';
import {mdiFacebook, mdiInstagram, mdiYoutube, mdiTwitter} from "@mdi/js"

const Musician = ({match}) =>{
    const classes = useStyles();
    const [musician, setMusician] = useState({
        name:"",
        surname:"",
        instrument:[],
        occupation:[],
        born:"",
        died:"",
        image:"",
        id:"",
        bands:[]
    });
    const [loader, setLoader] = useState(true);

    const getMusician = async () =>{
        await axios.get("/musician/"+match.params.id)
        .then(response=>{
            setMusician(response.data);
            setLoader(false);
        })
        .catch(()=>{
            setMusician({});
            setLoader(false);
        })
    }

    useEffect(()=>{
        getMusician();
    },[])

    return(
        <div className={classes.font}>

        {
            loader ? <Loader open={true} title={"Loading..."} /> : 
            <Container className={classes.musicianContainer}>
                <Card className={classes.musicianCard}>
                    <Grid item sm={6}>
                        <Card className={classes.musicianCard1}> 
                            <div className={classes.bandPageHeader}> 
                                <h2>{musician.name} {musician.surname} </h2>
                            </div>
                            <CardContent className={classes.musicianInfo}>
                                <List>
                                    <ListItem>Born: {musician.born}</ListItem>
                                    <ListItem>Died: { musician.died === "" ? "Alive" : musician.died }</ListItem>
                                    <ListItem>
                                        <div>
                                            Instruments:{musician.instrument.map(i => (<ol>{i}</ol>))}
                                        </div>
                                    </ListItem>
                                    <ListItem>
                                        <div>
                                            Occupation:{musician.occupation.map(o=>(<ul>{o}</ul>))}
                                        </div>
                                    </ListItem>
                                    <ListItem>
                                        <div>
                                            Bands:{musician.bands.map(b=>(<Link className={classes.memberLink} to={`/band/${b.id}`}> <ul key={b.id}>{b.name}</ul> </Link>))}
                                        </div>
                                    </ListItem>
                                    
                                    <ListItem>
                                        <div>
                                            Social Follow:
                                            <ul>
                                                <a href="https://www.facebook.com/" target = "_blank" className={classes.homepageLink}>
                                                    <Icon size={1} path={mdiFacebook} />
                                                </a>
                                                <a href="https://www.instagram.com/" target = "_blank" className={classes.homepageLink}>
                                                    <Icon size={1} path={mdiInstagram} />
                                                </a>
                                                <a href="https://www.youtube.com" target = "_blank" className={classes.homepageLink}>
                                                    <Icon size={1} path={mdiYoutube} />
                                                </a>
                                                <a href="https://www.twitter.com/" target = "_blank" className={classes.homepageLink}>
                                                    <Icon size={1} path={mdiTwitter} />
                                                </a>  
                                            </ul> 
                                        </div>
                                    </ListItem>
                                </List>
                                 
                             
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={6}>
                        <div className={classes.musicianImageBorder}>
                            {
                                musician.image || musician.image !== ""  ?
                                <img src={musician.image} loading={img} className={classes.musicianImage} />
                                :<img src={img} loading={img} className={classes.musicianImage} />
                            }
                        </div>
                    </Grid>
                    
                </Card>              
            </Container>
        
        }

    </div>
    )
}

export default Musician;
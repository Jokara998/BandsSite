import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import {Container, Card, CardContent, List } from "@material-ui/core"
import Button from "../components/controls/Button"
import useStyles from "../assets/dashboardStyles"
import Loader from "../components/Loader";
import axios from "../axios/index"
import GenreDashCard from "../pages/dashboards/genre/GenreDashCard"

const Dashboard = () =>{
    const classes = useStyles();
    const history = useHistory();

    const [loader, setLoader] = useState(false);
    const [genres, setGenres] = useState([]);

    const getGenres = async () =>{
        setLoader(true);
        await axios.get("/genre")
        .then(response => {
            setGenres(response.data);
            setLoader(false);
        })
        .catch(()=>{
            setGenres([]);
            setLoader(false);
        })  
    }

    useEffect(()=>{
        getGenres();
    },[])

    return(
        <div className={classes.font}>
            {
                loader ? <Loader open={loader} title={"Proccesing request..."}/> :

                <Container className={classes.dashContainer}>
                    <Card className={classes.dashCard}>
                        <div className={classes.dashGenreHeader}> 
                            <h1>Genres</h1>
                                <Button
                                    variant="text"
                                    className={classes.dashButton}
                                    text="New Genre"
                                    onClick={()=>history.push("/dashboard/genre/new")}
                                />
                        </div>
                        <CardContent>
                            <Container className={classes.dashListContainer}>
                            { 
                                genres.length === 0 ? <h2 style={{color:"#f5f5f5", marginTop:"130px"}}> No genres available! </h2> :
                                <List className={classes.dashList}>
                                    {genres.map((genre, index) =>(<GenreDashCard key={genre.id} index={index+1} genre={genre} />))}
                                </List>
                            }
                            </Container>
                        </CardContent>
                    </Card>
                </Container>
            }
        </div>
    )
}

export default Dashboard;
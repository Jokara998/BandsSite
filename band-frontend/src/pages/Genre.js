import React, {useEffect, useState} from "react"
import useStyles from "../assets/styles"
import axios from "../axios/index"
import {Container, Grid} from "@material-ui/core"
import BandCard from "../components/band/BandCard"
import Loader from "../components/Loader"

const Genre = ({match}) =>{
    const classes = useStyles();
    const [bands, setBands] = useState([]);
    const [genre, setGenre] = useState({});
    const [grid, setGrid] = useState(4);
    const [loader, setLoader] = useState(true)

    const getGenre = async ()=>{
        await axios.get("/genre/"+match.params.id)
        .then(response=>{
            setGenre(response.data);
            getBands();
        }).catch(()=>{
            setGenre({});
            setBands([])
            setLoader(false);
        })
    }

    const getBands = async () =>{
        await axios.get("/genre/"+match.params.id+"/band")
        .then(response=>{
            setBands(response.data)
            if(response.data.length === 1)
                setGrid(4)
            setLoader(false);
        }).catch(()=>{
            setBands([])
            setLoader(false);
        })
    }

    useEffect(()=>{
        getGenre();
    },[])
    

    return(
        <div className={classes.font}>
        {
            loader ? <Loader open={loader} title={"Loading..."} /> : 
            <div>
                <h1 style={{color:"#f5f5f5"}}> {genre.name} </h1>
                { 
                    bands.length === 0 ? <h2 style={{color:"#f5f5f5", marginTop:"30px"}}> No bands available! </h2> :
                    <Container className={classes.genreContainer}>
                            {   
                                bands.map( band => (
                                    <Grid item sm={grid} spacing={3} style={{display:'flex', justifyContent:"center", alignContent:'center'}}>
                                        <BandCard key={band.id} band={band} />
                                    </Grid>
                                ))
                            }
                    </Container>
                }
            </div>
        }
    </div>
    );
}

export default Genre;
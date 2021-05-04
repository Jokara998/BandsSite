import React, {useState, useEffect} from "react"
import {Container, Card, ListItem, List, CardContent, CardActions } from "@material-ui/core"
import axios from "../axios/index"
import Loader from "../components/Loader"
import useStyles from "../assets//styles"
import img from "../assets/noimg.jpg"
import Button from "../components/controls/Button"
import {Link} from "react-router-dom"

const Band = ({match}) =>{
    const classes = useStyles();
    const [band, setBand] = useState({
        id: "",
        name:"",
        description:"",
        founded:"",
        ended:"",
        genre:"",
        image:[],
    });
    const [members, setMembers] = useState([]);
    const [loader, setLoader] = useState(true);

    const getBand = async () =>{
        await axios.get("/band/"+match.params.id)
        .then(response=>{
            setBand(response.data);
            getMembers();
        })
        .catch(()=>{
            setBand({
                id: "",
                name:"",
                description:"",
                founded:"",
                ended:"",
                genre:"",
                image:[],
            });
            setMembers([]);
            setLoader(false);
        })
    }

    const getMembers = async () =>{
        await axios.get("/band/"+match.params.id+"/musician")
        .then(response=>{
            setMembers(response.data);
            setLoader(false);
        })
        .catch(()=>{
            setMembers([]);
            setLoader(false);
        })
    }

    useEffect(()=>{
        getBand();
    },[])

    return(
        <div className={classes.font}>

            {
                loader ? <Loader open={true} title={"Loading..."} /> : 
                <Container className={classes.bandPageContainer}>
                    <Card className={classes.bandPageCard}>
                        <div className={classes.bandPageHeader}> 
                            <h2 style={{marginLeft:"10px", marginTop:"26px"}}>{band.name}</h2>
                            <h4 className={classes.bandPageYear}>Active:{band.founded}-{band.ended}</h4>
                        </div>
                        <div className={classes.bandPageImageBorder}>
                            { 
                                band.image || band.image !== "" ? 
                                <img src={band.image} loading={img} className={classes.bandPageImage} />
                                :<img src={img} loading={img} className={classes.bandPageImage} />
                            }
                        </div>
                        <CardContent className={classes.bandPageBio}>
                            <p>Bio: {band.description}</p>
                        </CardContent>
                        <CardContent className={classes.bandPageMembers}>
                            <p>Members:</p>
                            { 
                                members.length === 0 ? <h2 style={{color:"#f5f5f5", marginTop:"16px", marginLeft:"2px", fontSize:"15px"}}> No members available! </h2> :
                                <List> 
                                    {members.map(member=>(
                                        <Link key={member.id} className={classes.memberLink} to={`/musician/${member.id}`}>
                                            <ListItem> {member.name} {member.surname} </ListItem>
                                        </Link>
                                    ))} 
                                </List>
                            }
                        </CardContent>
                        <CardActions className={classes.bandPageActions}>
                            <Link to={`/band/${match.params.id}/album`}  className={classes.link} >
                                <Button className={classes.bandPageButton} text={"See Albums"} />
                            </Link>
                        </CardActions>
                    </Card>
                </Container>
            
            }

        </div>
        
    );
}

export default Band;
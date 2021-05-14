import React, {useState} from "react"
import {Card, ListItem, Grid, IconButton, Tooltip } from "@material-ui/core"
import useStyles from "../../../assets/styles"
import {Icon} from '@mdi/react';
import {mdiSquareEditOutline, mdiDeleteOutline} from "@mdi/js"
import {useHistory} from "react-router-dom"
import DeleteDialog from "../../../components/DeleteDialog"
import Loader from "../../../components/Loader"
import SuccessMessage from "../../../components/SuccessMessage"
import ErrorMessage from "../../../components/ErrorMessage"
import axios from "../../../axios/index"

const GenreDashCard = ({genre, index}) =>{
    const classes = useStyles();
    const history = useHistory();
    const [deleteModal, setDeleteModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [miniLoader, setMiniLoader] = useState(false);

    const itemStyle = {
        marginTop:"3px",
    }

    const redirectGenreDash = () =>{
        window.location.reload();
    }

    const errorClose = () =>{
        setError(false)
    }

    const deleteGenreFun = async () =>{
        setMiniLoader(true);
        await axios.delete("/genre/"+genre.id)
        .then(response=>{
            setMiniLoader(false);
            setSuccess(true);
        })
        .catch(err=>{
            setMiniLoader(false);
            setErrorMessage(err.response.data.message);
            setError(true);
        })
    }

    return (
       <ListItem className={classes.songListItem}>
           <Card className={classes.songCard}>
               <Grid sm={1} style={itemStyle}> {index}. </Grid>
               <Grid sm={8} style={itemStyle}> {genre.name} </Grid>
               <Grid sm={3} style={{display:"flex", justifyContent:"center", alignText:"left"}}>
                    <Tooltip title={<h2 className={classes.tooltip}>Edit Genre?</h2>} placement="top" arrow>
                        <IconButton onClick={()=>{history.push("/dashboard/genre/"+genre.id+"/edit")}}> 
                            <Icon className={classes.songCardIcon} size={1.2} path={mdiSquareEditOutline} /> 
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title={<h2 className={classes.tooltip}>Delete Genre?</h2>}  placement="top" arrow>
                    <IconButton onClick={()=>{setDeleteModal(true)}}> 
                            <Icon className={classes.songCardIcon} size={1.2} path={mdiDeleteOutline} /> 
                        </IconButton>  
                    </Tooltip>
                </Grid>
           </Card>
            {deleteModal ? <DeleteDialog payload={genre} type={"genre"} open={deleteModal} confirm={true} confirmFun={deleteGenreFun} cancel={true} cancelFun={()=>setDeleteModal(false)} /> : null}
            {miniLoader ? <Loader key={"miniLoader"} open={miniLoader} title={"Proccesing request..."} /> : null}
            {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
            {success ? <SuccessMessage open={success} message={"Genre deleted!"} confirm={true} confirmFun={redirectGenreDash} /> : null}
       </ListItem>
       
    );
}

export default GenreDashCard;
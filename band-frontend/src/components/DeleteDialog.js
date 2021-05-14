import React from "react"
import {Modal, Container, Card, CardHeader, CardContent, CardActions} from '@material-ui/core'
import useStyles from "../assets/styles"
import Button from "./controls/Button"

const DeleteDialog = ({payload, type, open, handleClose, confirm, confirmFun, cancel, cancelFun}) =>{
    const classes = useStyles();

    switch(type){
        case "playlist":
            return(
                <Modal open={open} onClose={handleClose}>
                    <Container className={classes.loaderContainer}>
                        <Card className={classes.loaderCard}>
                            <CardHeader title="Delete Playlist"/>
                            <CardContent>
                                <p style={{display:"flex"}}>Are you sure you want to delete playlist <span style={{color:"#C11003", whiteSpace: "pre-wrap"}}> {payload.name} </span>? </p>
                            </CardContent>
                            <CardActions style={{justifyContent:"flex-end"}}>
                                {confirm ? <Button className={classes.confirmButton} onClick={confirmFun} text={"Confirm"}  /> : null}
                                {cancel ? <Button className={classes.cancelButton} onClick={cancelFun} text={"Cancel"}/> : null}
                            </CardActions>
                        </Card>
                    </Container> 
                </Modal>     
            );
        case "genre":
            return(
                <Modal open={open} onClose={handleClose}>
                    <Container className={classes.loaderContainer}>
                        <Card className={classes.loaderCard}>
                            <CardHeader title="Delete Genre"/>
                            <CardContent>
                                <p style={{display:"flex"}}>Are you sure you want to delete genre <span style={{color:"#C11003", whiteSpace: "pre-wrap"}}> {payload.name} </span>? </p>
                            </CardContent>
                            <CardActions style={{justifyContent:"flex-end"}}>
                                {confirm ? <Button className={classes.confirmButton} onClick={confirmFun} text={"Confirm"}  /> : null}
                                {cancel ? <Button className={classes.cancelButton} onClick={cancelFun} text={"Cancel"}/> : null}
                            </CardActions>
                        </Card>
                    </Container> 
                </Modal>     
            );
    }

    
}

export default DeleteDialog;


import React from "react"
import {Modal, Container, Card, CardHeader, CardContent, CardActions} from '@material-ui/core'
import useStyles from "../assets/styles"
import Button from "./controls/Button"

const SuccessMessage = ({open, handleClose, message, confirm, confirmFun, cancel, cancelFun}) =>{
    const classes = useStyles();

    return(
        <Modal open={open} onClose={handleClose}>
            <Container className={classes.loaderContainer}>
                <Card className={classes.loaderCard}>
                    <CardHeader title="Success Message!"/>
                    <CardContent>
                        <p> {message} </p>
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

export default SuccessMessage;


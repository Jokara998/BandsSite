import React from "react"
import {Modal, Container, Card, CardHeader, CardContent, CardActions} from '@material-ui/core'
import useStyles from "../assets/styles"
import Button from "./controls/Button"

const ErrorMessage = ({open, handleClose, message, close, closeFun}) =>{
    const classes = useStyles();

    return(
        <Modal open={open} onClose={handleClose}>
            <Container className={classes.loaderContainer}>
                <Card className={classes.loaderCard}>
                    <CardHeader className={classes.loaderHeader} title="Error Message!"/>
                    <CardContent>
                        <p> {message} </p>
                    </CardContent>
                    <CardActions style={{justifyContent:"flex-end"}} >
                        {close ? <Button className={classes.cancelButton} onClick={closeFun} text={"Close"}/> : null}
                    </CardActions>
                </Card>
            </Container> 
        </Modal>     
    );
}

export default ErrorMessage;


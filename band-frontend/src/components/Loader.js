import React from "react"
import {Modal, Container, LinearProgress, Card, CardHeader, CardContent} from '@material-ui/core'
import useStyles from "../assets/styles"

const Loader = ({open, handleClose, title}) =>{
    const classes = useStyles();

    return(
        <Modal open={open} onClose={handleClose}>
            <Container className={classes.loaderContainer}>
                <Card className={classes.loaderCard}>
                    <div className={classes.loaderHeader}>
                        <h1 style={{fontSize:"28px"}}>
                            {title}
                        </h1>
                    </div> 
                    <CardContent>
                        <LinearProgress className={classes.loaderProgress} color="primary" />
                    </CardContent>
                </Card>
            </Container> 
        </Modal>     
    );
}

export default Loader;


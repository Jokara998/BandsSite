import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {Container, Card, CardHeader, CardContent, Grid, TextField} from "@material-ui/core"
import Button from "../../../components/controls/Button"
import Loader from "../../../components/Loader"
import ErrorMessage from "../../../components/ErrorMessage"
import SuccessMessage from "../../../components/SuccessMessage"
import useStyles from "../../../assets/styles"
import {useForm, Controller} from "react-hook-form"
import axios from "../../../axios/index"

const NewGenre = () =>{
    const classes = useStyles();
    const history = useHistory();
    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const postGenre = async (data, e) =>{
        e.preventDefault();
        console.log(data)
        setLoader(true)
        await axios.post("/genre", data)
        .then( () =>{
            reset({
                name:"",
                description:"",
            })
            handleClose();

        }).catch(err=>{
            handleError(err.response.data.message);
        })
    }

    const handleError = (messageError) => {
        setLoader(false);
        setErrorMessage(messageError);
        setError(true);
    }

    const errorClose = () =>{
        setError(false)
    }

    const handleClose = () => {
        setLoader(false);
        setSuccess(true);
    }

    return(
        <Container className={classes.loginContainer}>
            <Card className={classes.loginCard}>
                <CardHeader title="New Genre"/>
                <CardContent>
                <form onSubmit={handleSubmit(postGenre)} >
                     <br/>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                render={ 
                                    ({field}) => 
                                    <TextField 
                                        label="Name" 
                                        variant="filled" 
                                        type="text" 
                                        id="name" 
                                        required
                                        fullWidth
                                        className={classes.registerInput}
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputRef={field.ref}
                                        error={errors.name ? true : false}
                                        helperText={errors.name ?  errors.name.message : null}
                                    /> 
                                }
                                name="name"
                                defaultValue=""
                                control={control}
                                rules={
                                    {
                                        required:true, 
                                        maxLength:{ value:20, message:"Name must be less than 20 characters! "}, 
                                        minLength:{ value:2, message:"Name must be more than 1 characters! "}, 
                                    }
                                }
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Controller
                                render={ 
                                    ({field}) => 
                                    <TextField 
                                        label="Description" 
                                        variant="filled" 
                                        type="text" 
                                        id="description" 
                                        required
                                        fullWidth
                                        rows={5}
                                        multiline
                                        className={classes.registerInput}
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputRef={field.ref}
                                        error={errors.description ? true : false}
                                        helperText={errors.description ?  errors.description.message : null}
                                    /> 
                                }
                                name="description"
                                defaultValue=""
                                control={control}
                                rules={
                                    {
                                        required:true, 
                                        maxLength:{ value:40, message:"Description must be less than 40 characters! "}, 
                                        minLength:{ value:11, message:"Description must be more than 10 characters! "}, 
                                    }
                                }
                            />
                        </Grid>
                     </Grid>
                     <br/>
                     <Grid container> 
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.registerButton}
                            text="Submit"
                        />
                        </Grid>
                     
                    </form>
                </CardContent>
            </Card>
            {loader ? <Loader open={loader} title={"Proccesing request..."}/> : null}
            {success ? <SuccessMessage open={success} message={"Genre Added!"} confirm={true} confirmFun={()=>{history.push("/dashboard/genre")}} /> : null}
            {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
        </Container>   
    )
}

export default NewGenre;
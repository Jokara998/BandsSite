import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import {Container, Card, CardHeader, CardContent, Grid, TextField} from "@material-ui/core"
import Button from "../../../components/controls/Button"
import Loader from "../../../components/Loader"
import ErrorMessage from "../../../components/ErrorMessage"
import SuccessMessage from "../../../components/SuccessMessage"
import useStyles from "../../../assets/styles"
import {useForm, Controller} from "react-hook-form"
import axios from "../../../axios/index"

const EditGenre = ({match}) =>{
    const classes = useStyles();
    const history = useHistory();
    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const [loader, setLoader] = useState(true);
    const [miniLoader, setMiniLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [genre, setGenre] = useState({});

    const getGenre = async ()=>{
        await axios.get("/genre/"+match.params.id)
        .then(response=>{
            setGenre(response.data)
            setLoader(false);
        }).catch(()=>{
            setLoader(false);
        })
    }

    const putGenre = async (data, e) =>{
        e.preventDefault();
        setMiniLoader(true)
        await axios.put("/genre/"+genre.id, data)
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
        setMiniLoader(false);
        setErrorMessage(messageError);
        setError(true);
    }

    const errorClose = () =>{
        setError(false)
    }

    const handleClose = () => {
        setMiniLoader(false);
        setSuccess(true);
    }

    useEffect(()=>{
        getGenre();
    },[])

    return(
        <div> 
        { 
            loader ? 
            <Loader  open={loader} title={"Proccesing request..."}/> : 
            <Container className={classes.loginContainer}>
                <Card className={classes.loginCard}>
                    <CardHeader title="Edit Genre"/>
                    <CardContent>
                    <form onSubmit={handleSubmit(putGenre)} >
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
                                    defaultValue={genre.name}
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
                                    defaultValue={genre.description}
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
                {miniLoader ? <Loader  open={loader} title={"Proccesing request..."}/> : null}
                {success ? <SuccessMessage open={success} message={"Genre Updated!"} confirm={true} confirmFun={()=>{history.push("/dashboard/genre")}} /> : null}
                {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
            </Container>   
        }
        </div>
    )
}

export default EditGenre;
import React, {useState} from "react"
import { useHistory } from "react-router-dom";
import {Container, Card, CardHeader, CardContent, Grid, TextField, IconButton} from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "../components/controls/Button"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"
import SuccessMessage from "../components/SuccessMessage"
import useStyles from "../assets/styles"
import {useForm, Controller} from "react-hook-form"
import axios from "../axios/index"


const Register = () =>{

    const classes = useStyles();
    const history = useHistory();
    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);  
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const showPasswordHandle = () =>{
        setShowPassword(prevShowPassword => !prevShowPassword);
    }

    const handleClose = () => {
        setLoader(prevLoader => !prevLoader);
        setSuccess(prevSuccess => !prevSuccess);
    }

    const handleError = (messageError) => {
        setLoader(prevLoader => !prevLoader);
        setErrorMessage(messageError);
        setError(prevError => !prevError);
    }

    const errorClose = () =>{
        setError(prevError=>!prevError)
    }

    const redirectLogin = () =>{
        history.push("/login");
    }

    const sendRegister = async (data, e) => {
        e.preventDefault();
        setLoader( prevLoader => !prevLoader);
        await axios.post("/user/register", data)
        .then(response=>{
            reset({
                name:"",
                surname:"",
                password:"",
                username:""
            })
            handleClose();
        }).catch(err=>{
            handleError(err.response.data.message);
        })
    }

    return(
        <Container className={classes.registerContainer}>
            <Card className={classes.registerCard}>
                <CardHeader title="Register"/>
                <CardContent>
                <form onSubmit={handleSubmit(sendRegister)} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                     
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
                                    }
                                }                            
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                 render={ 
                                    ({field}) => 
                                    <TextField 
                                        label="Surname" 
                                        variant="filled" 
                                        type="text" 
                                        id="surname" 
                                        required
                                        fullWidth
                                        className={classes.registerInput}
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputRef={field.ref}
                                        error={errors.surname ? true : false}
                                        helperText={errors.surname ?  errors.surname.message : null}
                                    /> 
                                }
                                name="surname"
                                defaultValue=""
                                control={control}
                                rules={
                                    {
                                        required:true, 
                                        maxLength:{ value:20, message:"Surname must be less than 20 characters! "}, 
                                    }
                                }
                            />
                        </Grid>
                     </Grid>
                     <br/>
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                render={ 
                                    ({field}) => 
                                    <TextField 
                                        label="Username" 
                                        variant="filled" 
                                        type="text" 
                                        id="username" 
                                        required
                                        fullWidth
                                        className={classes.registerInput}
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputRef={field.ref}
                                        error={errors.username ? true : false}
                                        helperText={errors.username ?  errors.username.message : null}
                                    /> 
                                }
                                name="username"
                                defaultValue=""
                                control={control}
                                rules={
                                    {
                                        required:true, 
                                        maxLength:{ value:20, message:"Username must be less than 20 characters! "}, 
                                        minLength:{ value:6, message:"Username must be more than 5 characters! "}, 
                                    }
                                }
                            
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                render={ 
                                    ({field}) => 
                                    <TextField 
                                        label="Password" 
                                        variant="filled" 
                                        type={showPassword?"text":"password"} 
                                        id="password" 
                                        required
                                        fullWidth
                                        className={classes.registerInput}
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputRef={field.ref}
                                        error={errors.password ? true : false}
                                        helperText={errors.password ?  errors.password.password : null}
                                        InputProps={{
                                            endAdornment:
                                                    <IconButton
                                                        onClick = {showPasswordHandle}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                        }}                                                                      
                                    />                                                                                       
                                }
                                name="password"
                                defaultValue=""
                                control={control}
                                rules={
                                    {
                                        required:true, 
                                        maxLength:{ value:20, message:"Password must be less than 20 characters! "}, 
                                        minLength:{ value:6, message:"Password must be more than 5 characters! "}, 
                                    }
                                }
                                
                                
                            />
                        </Grid>
                     </Grid>
                     <br/>
                     <Grid> 
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.registerButton}
                            text="Register"
                        />
                        </Grid>
                     
                    </form>
                </CardContent>
            </Card>
            {loader ? <Loader open={loader} title={"Proccesing request..."} /> : null}
            {success ? <SuccessMessage open={success} message={"Registration successful!"} confirm={true} confirmFun={redirectLogin} /> : null}
            {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
        </Container>   
    )
}

export default Register;
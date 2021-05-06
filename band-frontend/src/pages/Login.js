import React, {useState, useContext} from "react"
import {useHistory} from "react-router-dom"
import {Container, Card, CardHeader, CardContent, Grid, TextField, IconButton} from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "../components/controls/Button"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"
import useStyles from "../assets/styles"
import {useForm, Controller} from "react-hook-form"
import axios from "../axios/index"
import {UserContext} from "../context/UserContext"
import getUserInfo from "../service/getUserInfo"



const Login = () =>{
    const classes = useStyles();
    const history = useHistory();
    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);  
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useContext(UserContext);

    const getUser = async () =>{
        const userInfo = await getUserInfo();
        setUser(userInfo);
    }


    const sendLogin = async (data, e) =>{
        e.preventDefault();
        setLoader(prevLoader=>!prevLoader)
        await axios.post("/user/login", data)
        .then( response=>{

            console.log(response);
            setLoader(prevLoader=>!prevLoader)
            getUser();
            history.push("/")

        }).catch(err=>{
            handleError(err.response.data.message);
        })
    }

    const showPasswordHandle = () =>{
        setShowPassword(prevShowPassword => !prevShowPassword);
    }

    const handleError = (messageError) => {
        setLoader(prevLoader => !prevLoader);
        setErrorMessage(messageError);
        setError(prevError => !prevError);
    }

    const errorClose = () =>{
        setError(prevError=>!prevError)
    }

    return(
        <Container className={classes.loginContainer}>
            <Card className={classes.loginCard}>
                <CardHeader title="Login"/>
                <CardContent>
                <form onSubmit={handleSubmit(sendLogin)} >
                     <br/>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                     <Grid container> 
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.registerButton}
                            text="Login"
                        />
                        </Grid>
                     
                    </form>
                </CardContent>
            </Card>
            {loader ? <Loader open={loader} title={"Proccesing request..."}/> : null}
            {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
        </Container>   
    )
}

export default Login;
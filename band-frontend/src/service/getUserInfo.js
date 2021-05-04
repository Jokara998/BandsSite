import axios from "../axios/index"


const getUserInfo = async () =>{
    let user = {
        loggedIn:false,
        type:"",
        username:"",
    }

    await axios.get("/user/auth")
       .then((response)=>{
           user = response.data;
       })
       .catch(()=>{
           return {
            loggedIn:false,
            type:"",
            username:"",
           };
       })
    
    return user;
}

export default getUserInfo;
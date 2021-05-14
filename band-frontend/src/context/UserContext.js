import React, {createContext, useState, useEffect} from "react"
import getUserInfo from "../service/getUserInfo"

export const UserContext = createContext();
export const UserProvider = (props) =>{
    
    const [user, setUser] = useState({
        loggedIn:false,
        type:"",
        username:"",
    })

    const [isFetched, setIsFetched] = useState(false);

    const getUser = async () =>{
        const info = await getUserInfo();
        setIsFetched(true);
        setUser(info);
        
    }

    useEffect(()=>{
        getUser();
    },[])
    
    return(
        <UserContext.Provider value={[user, setUser, isFetched]}>
            {props.children}
        </UserContext.Provider>
    )
}
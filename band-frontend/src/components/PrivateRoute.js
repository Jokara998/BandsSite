import React from "react"
import {Route, Redirect} from "react-router-dom"


const PrivateRoute = ({ user, type, component:Component, ...rest}) =>{

    return(
        <Route {...rest} render={(props)=>{
            if (user.type === type)
                return <Component {...props}/>
            else 
                return <Redirect to="/" />
        }}
        />    
    )
}

export default PrivateRoute;
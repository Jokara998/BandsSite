import PrivateRoute from "./PrivateRoute"
import Playlists from "../pages/Playlists"
import Playlist from "../pages/Playlist"
import NewPlaylist from "../pages/NewPlaylist"
import EditPlaylist from "../pages/EditPlaylist"
import GenreDashboard from "../pages/GenreDashboard"
import NewGenre from "../pages/dashboards/genre/NewGenre"
import EditGenre from "../pages/dashboards/genre/EditGenre"
import {UserContext} from "../context/UserContext";
import React, {useEffect, useContext} from "react"

const PrivateRouter = () =>{

    const [user, setUser] = useContext(UserContext);
    
    return(
        <>
            <PrivateRoute path="/dashboard/genre" exact component={GenreDashboard} type={"Moderator"} user={user} />
            <PrivateRoute path="/dashboard/genre/new" component={NewGenre} type={"Moderator"} user={user} />
            <PrivateRoute path="/dashboard/genre/:id/edit" component={EditGenre} type={"Moderator"} user={user} />

            <PrivateRoute path="/playlist" exact component={Playlists} type={"Client"} user={user} />
            <PrivateRoute path="/playlist/:id" component={Playlist} type={"Client"} user={user} />
            <PrivateRoute path="/playlist/:id/edit" component={EditPlaylist} type={"Client"} user={user} />
            <PrivateRoute path="/new-playlist/" component={NewPlaylist} type={"Client"} user={user}/>

        </>
     
    );
}

export default PrivateRouter;
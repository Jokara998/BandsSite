import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Genres from "./pages/Genres"
import Genre from "./pages/Genre"
import Homepage from "./pages/Homepage"
import Band from "./pages/Band"
import Musician from "./pages/Musician"
import Albums from "./pages/Albums"
import Album from "./pages/Album"
import Playlists from "./pages/Playlists"
import Playlist from "./pages/Playlist"
import NewPlaylist from "./pages/NewPlaylist"
import EditPlaylist from "./pages/EditPlaylist"
import Dashboard from "./pages/Dashboard"
import NewGenre from "./pages/dashboards/genre/NewGenre"
import {UserProvider} from "./context/UserContext"
import theme from './assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import React from "react"

function App() {

  return (
    <UserProvider>
          <div className="App">
          <ThemeProvider theme={theme} > 
            <Router>
                <NavBar/>
                <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/dashboard/genre" exact component={Dashboard} />
                  <Route path="/dashboard/genre/new" component={NewGenre} />

                  <Route path="/playlist" exact component={Playlists} />
                  <Route path="/playlist/new" component={NewPlaylist} />
                  <Route path="/playlist/:id" exact component={Playlist} />
                  <Route path="/playlist/:id/edit" component={EditPlaylist} />

                  <Route path="/genre" exact component={Genres} />
                  <Route path="/genre/:id/band" component={Genre} />

                  <Route path="/band/:id" exact component={Band} />
                  <Route path="/band/:id/album" component={Albums} />

                  <Route path="/album/:id" component={Album} />
                  <Route path="/musician/:id" component={Musician} />
                </Switch>
            </Router>
            </ThemeProvider>
          </div>
    </UserProvider>
  );
}

export default App;

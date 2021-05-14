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
import {UserProvider, UserContext} from "./context/UserContext"
import theme from './assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import React, {useContext} from "react"
import PrivateRouter from "./components/PrivateRouter"

function App() {
  
  const isFetched = useContext(UserContext)[2];

  return (
          <div className="App">
            <ThemeProvider theme={theme} > 
                <Router>
                    <NavBar/>
                    <Switch>
                      <Route path="/" exact component={Homepage} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />

                      <Route path="/genre" exact component={Genres} />
                      <Route path="/genre/:id/band" component={Genre} />

                      <Route path="/band/:id" exact component={Band} />
                      <Route path="/band/:id/album" component={Albums} />

                      <Route path="/album/:id" component={Album} />
                      <Route path="/musician/:id" component={Musician} />

                      { isFetched && <PrivateRouter /> } 

                    </Switch>
                </Router>
            </ThemeProvider>
          </div>
  );
}

export default ()=>(
  <UserProvider>
    <App/>
  </UserProvider>
);

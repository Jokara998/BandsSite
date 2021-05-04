import React, {useState, useEffect} from "react"
import {Container, Card, CardHeader, CardContent, Grid, MenuItem, InputLabel, Select, IconButton, Tooltip, List, ListItem, TextField} from "@material-ui/core"
import Button from "../components/controls/Button"
import Loader from "../components/Loader"
import useStyles from "../assets/styles"
import {useForm, Controller} from "react-hook-form"
import axios from "../axios/index"
import { mdiPlaylistPlus, mdiCloseCircleOutline } from '@mdi/js'
import {Icon} from '@mdi/react';
import ErrorMessage from "../components/ErrorMessage"
import SuccessMessage from "../components/SuccessMessage"
import { useHistory } from "react-router-dom";

const EditPlaylist = ({match}) =>{

    const classes = useStyles();
    const itemStyle = {
        marginTop:"3px",
    }

    const history = useHistory();

    const [loader, setLoader] = useState(true);
    const [miniLoader, setMiniLoader] = useState(false);
    const [loadedPlaylist, setLoadedPlaylist] = useState({});
    const { handleSubmit, control, formState: { errors }, reset, getValues, setValue } = useForm();

    const [genres, setGenres] = useState([]);
    const [bands, setBands] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedBand, setSelectedBand] = useState("");
    const [selectedAlbum, setSelectedAlbum] = useState("");

    const [playlist, setPlaylist] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);


    const errorClose = () =>{
        setError(false)
    }

    const redirectPlaylist = () =>{
        history.push("/playlist")
    }

    const setPlaylistSongs = async (songs) =>{
        await songs.map(s => {
            setPlaylist(prevPlaylist => [...prevPlaylist, {id:s.id, name:s.name, band:s.band.name, album:s.album.name}])
        })
    }

    const getLoadedPlaylist = async () =>{
        console.log(match.params.id)
        await axios.get("/playlist/"+match.params.id)
        .then(async response=>{
            setLoadedPlaylist(response.data);
            setValue("name", loadedPlaylist.name)
            setPlaylistSongs(response.data.songs);
            getGenres();

        })
    }

    const getGenres = async () =>{
        await axios.get("/genre")
        .then(response=>{
            setValue("genres", response.data)
            setGenres(response.data)
            setLoader(false);
        })
    }

    const onChangeGenre = e =>{
        getBands(e.target.value);
    }

    const getBands = async (value) =>{
        setMiniLoader(true);
        setSelectedGenre(value)
        await axios.get("/genre/"+value.id+"/band")
        .then(response=>{
            setValue("bands", response.data)
            setBands(response.data)
            setAlbums([])
            setSongs([])
            setMiniLoader(false);
        })
    }

    const onChangeBand = e =>{
        getAlbums(e.target.value);
    }

    const getAlbums = async (value) =>{
        setMiniLoader(true);
        setSelectedBand(value)
        await axios.get("/band/"+value.id+"/album")
        .then(response=>{
            setValue("albums", response.data)
            setAlbums(response.data)
            setSongs([])
            setMiniLoader(false);
        })
    }

    const onChangeAlbum= e =>{
        getSongs(e.target.value);
    }

    const getSongs = async (value) =>{
        setMiniLoader(true);
        setSelectedAlbum(value)
        await axios.get("/album/"+value.id+"/song")
        .then(response=>{
            setValue("songs", response.data)
            setSongs(response.data)
            setMiniLoader(false);
        })
    }

    const addSongToPlaylist = () =>{
        const song = getValues("songs")
        if(playlist.some(playlist => playlist.id === song.id)){
            setErrorMessage("Song already added!");
            setError(true);
        }
        else{
            setPlaylist(prevPlaylist => [...prevPlaylist, {id:song.id, name:song.name, genre:selectedGenre.name, band:selectedBand.name, album:selectedAlbum.name}])
            setSelectedGenre("");
            setSelectedBand("");
            setSelectedAlbum("");
            setBands([]);
            setAlbums([]);
            setSongs([]);
           
        }
    }


    useEffect(()=>{
        getLoadedPlaylist();
    },[])


    const postPlaylist =  async (data, e) =>{
        e.preventDefault();
        if(playlist.length <= 1){
            setErrorMessage("Playlist must have atleast 2 songs!");
            setError(true);
        }else{
            let body = {
                name:data.name,
                songs:[]
            }
            playlist.map(p => {
                body.songs.push(p.id);
            })
            setMiniLoader(true);
            await axios.put("/playlist/"+loadedPlaylist.id,{
                name:body.name,
                songs:body.songs
            })
            .then((response)=>{
                reset();
                setMiniLoader(false);
                setSuccess(true);
            })
            .catch((err)=>{
                setMiniLoader(false);
                setErrorMessage(err.response.data.message);
                setError(true);
            })
        }
    }

    return(
        <div> 
            { 
                loader ? <Loader open={loader} title={"Proccesing request..."} /> :
                <Container className={classes.newPlaylistContainer}>
                    <Card className={classes.registerCard}>
                        <CardContent>
                        <form onSubmit={handleSubmit(postPlaylist)} >
                            <Grid style={{display:"flex", marginRight:"35px", marginLeft:"35px"}}>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className={classes.newPlaylistInputLabelH}>New Playlist</InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{display:"flex", justifyContent:"right", alignContent:"right", marginLeft:"30px"}}>
                                    <Controller
                                        render={ 
                                            ({field}) => 
                                            <TextField
                                                label="Playlist Name" 
                                                variant="filled" 
                                                type="text" 
                                                id="name" 
                                                required
                                                className={classes.playlistInput}
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
                                                maxLength:{ value:20, message:"Playlist name must be less than 20 characters! "}, 
                                            }
                                        }                            
                                    />
                                </Grid>
                            </Grid>
                            <br/>
                            <br/>
                            <Grid container spacing={2} style={{ marginLeft:"15px"}}>
                                <Grid item xs={12} sm={2}>
                                    <InputLabel className={classes.newPlaylistInputLabel}>Genres</InputLabel>
                                    <Controller
                                        render={ 
                                            ({field}) => 
                                            <Select 
                                                label={"Select"} 
                                                className={classes.newPlaylistSelect}
                                                fullWidth
                                                value={selectedGenre}
                                                onChange={onChangeGenre}
                                                MenuProps={{
                                                    variant:"menu",
                                                    style:{top:"40px"}
                                                }}
                                               
                                            >
                                                {genres.map(genre=>(<MenuItem key={genre.id} value={genre}>{genre.name}</MenuItem>))}
                                            </Select>
                                        }
                                        name="genres"
                                        defaultValue=""
                                        control={control}                     
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <InputLabel className={classes.newPlaylistInputLabel}>Bands</InputLabel>
                                    {
                                        bands.length === 0 ? <InputLabel className={classes.newPlaylistLabel}>No Bands Available</InputLabel> :
                                        <Controller
                                            render={ 
                                                ({field}) => 
                                                <Select 
                                                    label={"Select"} 
                                                    className={classes.newPlaylistSelect}
                                                    fullWidth
                                                    value={selectedBand}
                                                    onChange={onChangeBand}
                                                    MenuProps={{
                                                        variant:"menu",
                                                        style:{top:"40px"}
                                                    }}
                                                >
                                                    {bands.map(band=>(<MenuItem key={band.id} value={band}>{band.name}</MenuItem>))}
                                                </Select>
                                            }
                                            name="bands"
                                            defaultValue=""
                                            control={control}                     
                                        />
                                    }
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <InputLabel className={classes.newPlaylistInputLabel}>Albums</InputLabel>
                                    {
                                        albums.length === 0 ? <InputLabel className={classes.newPlaylistLabel}>No Albums Available</InputLabel> :
                                        <Controller
                                            render={ 
                                                ({field}) => 
                                                <Select 
                                                    label={"Select"} 
                                                    className={classes.newPlaylistSelect}
                                                    fullWidth
                                                    value={selectedAlbum}
                                                    onChange={onChangeAlbum}
                                                    MenuProps={{
                                                        variant:"menu",
                                                        style:{top:"40px"}
                                                    }}
                                                >
                                                    {albums.map(album=>(<MenuItem key={album.id} value={album}>{album.name}</MenuItem>))}
                                                </Select>
                                            }
                                            name="albums"
                                            defaultValue=""
                                            control={control}                     
                                        />
                                    }
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <InputLabel className={classes.newPlaylistInputLabel}>Songs</InputLabel>
                                    {
                                        songs.length === 0 ? <InputLabel className={classes.newPlaylistLabel}>No Songs Available</InputLabel> :
                                        <Controller
                                            render={ 
                                                ({field}) => 
                                                <Select 
                                                    label={"Select"} 
                                                    className={classes.newPlaylistSelect}
                                                    fullWidth
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    MenuProps={{
                                                        variant:"menu",
                                                        style:{top:"40px"}
                                                    }}
                                                    
                                                >
                                                    {songs.map(song=>(<MenuItem key={song.id} value={song}>{song.name}</MenuItem>))}
                                                </Select>
                                            }
                                            name="songs"
                                            defaultValue=""
                                            control={control}                     
                                        />
                                    }
                                </Grid>

                                <Grid item xs={12} sm={1}>
                                    <Tooltip title="Add Song To Playlist?" placement="top" arrow className={classes.tooltip}>
                                        <IconButton style={{marginTop:"7px", marginLeft:"-30px"}} onClick={addSongToPlaylist}>
                                            <Icon className={classes.playlistArrowIcon} size={1.6}  path={mdiPlaylistPlus}/>
                                        </IconButton>
                                    </Tooltip>             
                                </Grid>


                            </Grid>
                            <br/>
                            <Grid container xs={12}>
                                <Container style={{fontFamily:"New Rocker, cursive", display:"flex", justifyContent:'center', alignContent:"center"}}>
                                    <List>
                                        <ListItem>
                                            <div className={classes.songCardH}>
                                                <Grid sm={3} style={itemStyle}> Band </Grid>
                                                <Grid sm={4} style={itemStyle}> Album </Grid>
                                                <Grid sm={4} style={itemStyle}> Song </Grid>
                                            </div>
                                        </ListItem>
                                        {playlist.map(item=>
                                        <ListItem>
                                            <Card className={classes.songCardP}>
                                                <Grid sm={3} style={itemStyle}> {item.band} </Grid>
                                                <Grid sm={4} style={itemStyle}> {item.album} </Grid>
                                                <Grid sm={4} style={itemStyle}> {item.name} </Grid>
                                                <Grid sm={1} style={{display:"flex", justifyContent:"center", alignText:"left"}}>
                                                        <Tooltip title="Remove song from playlist?" placement="right" arrow className={classes.tooltip}>
                                                            <IconButton onClick={()=>{
                                                                const items = playlist.filter(it => it.id !== item.id);
                                                                setPlaylist(items)
                                                            }}> 
                                                                <Icon className={classes.songCardIcon} size={1.2} path={mdiCloseCircleOutline} /> 
                                                            </IconButton>  
                                                        </Tooltip>
                                                    </Grid>
                                            </Card>
                                        </ListItem>)}
                                    </List>                     
                                </Container>
                                
                            </Grid>
                            <br/>
                            <Grid> 
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.playlistButton2}
                                    text="Submit"
                                />
                                </Grid>
                            
                            </form>
                        </CardContent>
                    </Card>
                </Container>   
            }
            {miniLoader ? <Loader key={"miniLoader"} open={miniLoader} title={"Proccesing request..."} /> : null}
            {error ? <ErrorMessage open={error} message={errorMessage} close={true} closeFun={errorClose} /> : null}
            {success ? <SuccessMessage open={success} message={"Playlist edited!"} confirm={true} confirmFun={redirectPlaylist} /> : null}

        </div>
    )
}

export default EditPlaylist;
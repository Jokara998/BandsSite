const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require('dotenv/config')

app.use(cors({credentials:true, origin:["http://localhost:8081", "https://bandwsite.herokuapp.com"]}))
app.use(express.urlencoded({ extended: true , limit:'50mb' }));
app.use(express.json({limit: '50mb', extended: true}));
app.use(cookieParser());

// Routes
const GenreController = require("./controller/GenreController");
const BandController = require("./controller/BandController");
const MusicianController = require("./controller/MusicianController");
const AlbumController = require("./controller/AlbumController");
const SongController = require("./controller/SongController");
const UserController = require("./controller/UserController");
const PlaylistController = require("./controller/PlaylistController");

app.use("/genre", GenreController);
app.use("/band", BandController);
app.use("/musician", MusicianController);
app.use("/album", AlbumController);
app.use("/song", SongController);
app.use("/user", UserController);
app.use("/playlist", PlaylistController);

mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, ()=> console.log('connected to db!')
)

//Handle production
if(process.env.NODE_ENV === "production"){
    // Static folder
    app.use(express.static(__dirname+"/build/"));
    // Handle SPA
    app.get(/.*/, (req,res) =>{
        res.sendFile(__dirname + "/build/index.html")
    })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);
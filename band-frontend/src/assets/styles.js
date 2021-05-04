import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    // NAVBAR
    navContainer:{
        width:"80%"
    },
    navAppBar:{
        background:theme.palette.black,
        borderBottom:"1px solid #f5f5f5",
    },
    navGrid:{
        flexGrow:1
    },
    navButton:{
        margin: theme.spacing(1),
        variant:"text",
        color:"inherit",
        fullWidth:true,
        size:"medium",
     
    },
    navButtonH:{
        margin: theme.spacing(1),
        variant:"text",
        color:"inherit",
        fullWidth:true,
        fontSize:"18px"
    },
    navLink:{
        color:theme.palette.whitesmoke,
        fontSize:"18px",
        fontFamily: theme.typography.fontFamily,
        "& .MuiButton-root:hover":{
            backgroundColor:theme.palette.red
        }
    },
    navLinkH:{
        color:theme.palette.whitesmoke,
        fontSize:"22px",
        fontFamily: theme.typography.fontFamily,
    },

    // HOMEPAGE

    homepageWelcome:{
        display:"inline-block",
        position: "fixed",
        width: "100%",
        textAlign: "center",
        left:0,
        top:80,
        fontFamily: theme.typography.fontFamily

    },
    homepageSocialFollow:{
        display:"inline-block",
        position: "fixed",
        left: 0,
        bottom: 75,
        width: "100%",
        textAlign: "center",
        fontFamily: theme.typography.fontFamily
        
    },
    homepageSocialFollowBody:{
        display:"inline",
    },
    homepageLink:{
        color:theme.palette.whitesmoke,
        margin:"4px",
        "&:hover":{
            color:theme.palette.red
        }
    },


    // REGISTER

    registerContainer:{
        width:"40%",
        justifyContent:"center",
        marginTop:"150px",
       
    },
    registerCard:{
        backgroundColor: theme.palette.black,
        border:"1px solid #f5f5f5",
        color:theme.palette.whitesmoke,
        borderRadius:"9px"
    },

    // red color #7C0A02
    registerInput:{
        background:theme.palette.whitesmoke,
        borderRadius:"10px",
        "& .MuiFormLabel-root": {
            color:theme.palette.black,
        },
        "& .MuiFilledInput-underline::after": {
            borderBottomColor:theme.palette.black,
        },
    },
    registerButton:{
        background: theme.palette.red,
        borderRadius:"10px",
        color:theme.palette.whitesmoke,
        "&:hover":{
            color:theme.palette.red,
            backgroundColor:theme.palette.whitesmoke,
        }
    },

    // LOGIN
    loginContainer:{
        width:"25%",
        justifyContent:"center",
        marginTop:"150px",
       
    },
    loginCard:{
        backgroundColor: theme.palette.black,
        border:"1px solid #f5f5f5",
        color:theme.palette.whitesmoke,
        borderRadius:"9px"
    },


    // LOADER

    loaderContainer:{
        width:"40%",
        justifyContent:"center",
        marginTop:"225px",
       
    },
    loaderCard:{
        backgroundColor: theme.palette.black,
        border:"2px solid #f5f5f5",
        color:theme.palette.whitesmoke,
        borderRadius:"9px"
    },
    loaderHeader:{
        fontFamily: theme.typography.fontFamily,
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        height:"60px"
    },

    loaderProgress:{
        "& .MuiLinearProgress-barColorPrimary":{
            backgroundColor:theme.palette.red,
        }
    },

    // error & success
    confirmButton:{
        background:theme.palette.red,
        borderRadius:"10px",
        color:theme.palette.whitesmoke,
        marginRight:"10px",
        "&:hover":{
            color:theme.palette.red,
            backgroundColor:theme.palette.whitesmoke,
        }
        
    },
    cancelButton:{
        background:theme.palette.whitesmoke,
        borderRadius:"10px",
        color:theme.palette.red,
        marginRight:"10px",
        "&:hover":{
            color:theme.palette.whitesmoke,
            backgroundColor:theme.palette.red,
        }

    },
    iconButton:{
        color:theme.palette.whitesmoke
    },

    //GenreCard

    font:{
        fontFamily: theme.typography.fontFamily
    },

    genreContainer:{
        width:"80%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexWrap: "wrap"

    },

    genreHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"-7px"   
    },

    genreP:{
        color:theme.palette.whitesmoke,
        height:"100%" 
    },

    genreActions:{
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        height:"85%",
    },
    
    genreButton:{
        color:theme.palette.whitesmoke,
        background:theme.palette.red,
        "&:hover":{
            color:theme.palette.red,
            backgroundColor:theme.palette.whitesmoke,
        },
        "&:visited":{
            color:theme.palette.whitesmoke,
            background:theme.palette.red,
        },
        "&:active":{
            color:theme.palette.whitesmoke,
            background:theme.palette.red,
        }
    },

    // BAND & GENRE

    bandContainer:{
        width:"80%",
        display:"flex",
        alignItems:"space-around",
        justifyContent:"center",
        flexWrap: "wrap"
    },

    bandCard : {
        width: "250px",
        height: "300px",
        padding: "20px 20px",
        margin:"20px",
        borderRadius:"10px",
        background:"black",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border:"1px solid #f5f5f5",
    },

    bandHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"-8px",   
        display:"flex",
        width:"255px",
        alignContent:"center",
        justifyContent:"center"
    },

    bandP1:{
        color:theme.palette.whitesmoke,
        height:"100%",
        marginTop:"-10px" 
    },

    bandP2:{
        color:theme.palette.whitesmoke,
        height:"100%" 
    },

    bandActions:{
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        height:"82%"
    },
    
    bandButton:{
        color:theme.palette.whitesmoke,
        background:theme.palette.red,
        "&:hover":{
            backgroundColor:theme.palette.whitesmoke,
            color:theme.palette.red
        }
    },

     // BandPage

    bandPageContainer:{
        width:"80%",
        display:"flex",
        alignItems:"space-around",
        justifyContent:"center",
    },

    bandPageCard : {
        width: "50%",
        height: "750px",
        padding: "20px 20px",
        margin:"20px",
        borderRadius:"10px",
        background:"black",
        border:"1px solid #f5f5f5",
    },

    bandPageHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"-7px",
        display:"flex",
        justifyContent:"space-between",
        marginLeft:"30px",
        marginRight:"30px"
    },

    bandPageYear:{
        color:theme.palette.whitesmoke,
        marginTop:"35px",
    },
    bandPageBio:{
        color:theme.palette.whitesmoke,
        display:'flex',
        marginRight:"15px",
        marginLeft:"15px",

    },

    bandPageMembers:{
        color:theme.palette.whitesmoke,
        display:'flex',
        marginRight:"15px",
        marginLeft:"15px",
        height:"200px"
    },

    bandPageImageBorder:{
        border:"1px solid #f5f5f5",
        marginRight:"30px",
        marginLeft:"30px",
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius:"0px",
        height:"250px"
    },

    bandPageImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    bandPageActions:{
        display:"flex",
        justifyContent:"center",
        alignContent:"center"
    },
    
    bandPageButton:{
        color:theme.palette.whitesmoke,
        background:theme.palette.red,
        "&:hover":{
            backgroundColor:theme.palette.whitesmoke,
            color:theme.palette.red
        },
        marginTop:"50px"
    },

    memberLink:{
        color:theme.palette.whitesmoke,
        "&:hover":{
            color:theme.palette.red,
            cursor:"pointer"
        }
    },

    // MUSICIAN
    musicianContainer:{
        width:"80%",
        display:"flex",
        justifyContent:"center",
    },

    musicianCard : {
        width: "70%",
        height: "550px",
        padding: "20px 20px",
        marginTop:"30px",
        borderRadius:"10px",
        background:"black",
        border:"1px solid #f5f5f5",
        display:"flex",
    },

    musicianCard1 : {
        width: "auto",
        height: "450px",
        background:"black",
        display:"block",
        justifyContent:"start",
        alignContent:"start"
    },

    musicianImageBorder:{
        border:"1px solid #f5f5f5",
        marginRight:"30px",
        marginLeft:"30px",
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius:"0px",
        height:"500px"
    },

    musicianImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    musicianInfo:{
        color:theme.palette.whitesmoke,
    },

    musicianSocialFollow:{
        display:"inline-block",
        position: "fixed",
        width: "100%",
        textAlign: "center",
        fontFamily: theme.typography.fontFamily
    },

    albumsPageContainer:{
        display:"block",
        alignItems:"space-around",
        justifyContent:"center",
    },

    //ALBUMS
    albumsContainer:{
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        width:"80%",
        flexWrap: "wrap"
    },

    albumCard : {
        width: "400px",
        height: "330px",
        margin:"20px",
        borderRadius:"10px",
        background:"black",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border:"1px solid #f5f5f5",
    },

    albumImageBorder:{
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius:"0px",
        height:"220px",
        borderBottom:"1px dotted #f5f5f5",
        boxShadow: "5px 10px",
    },

    albumImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius:"15px"
    },

    link:{
        color:theme.palette.whitesmoke,
        "&:hover":{
            color:theme.palette.red,
            cursor:"pointer"
        },
    },

    albumLink:{
        color:theme.palette.whitesmoke,
        fontSize:"22px",
        "&:hover":{
            color:theme.palette.red,
            cursor:"pointer"
        },
    },

    bandLink:{
        color:"#b3b3b3",
        fontSize:"16px",
        "&:hover":{
            color:theme.palette.red,
            cursor:"pointer"
        },

    },

    // ALBUM PAGE

    albumPageContainer:{
        width:"80%",
        display:"flex",
        justifyContent:"center",
    },

    albumPageCard : {
        width: "65%",
        height: "650px",
        padding: "20px 20px",
        marginTop:"30px",
        borderRadius:"10px",
        background:"black",
        border:"1px solid #f5f5f5",
        display:"block",
    },

    albumPageCard1 : {
        width: "auto",
        height: "auto",
        background:"black",
        display:"block",
        justifyContent:"start",
        alignContent:"start",
        marginTop:"20px",
        marginLeft:"15px",

    },

    albumPageImageContainer:{
        justifyContent:"end",
        alignContent:"right",
        marginTop:"20px",
        marginRight:"15px",
    },

    albumPageImageBorder:{
        border:"1px solid #f5f5f5",
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius:"0px",
        height:"225px"
    },

    albumPageImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    albumPageHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"-7px",
        display:"block",
        marginLeft:"15px",
        marginRight:"15px",
        textAlign: "left",
    },

    albumPageListContainer:{
        marginTop:"50px",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        width:"100%",
    },

    albumPageList:{
        width: '100%',
        maxWidth: 470,
        backgroundColor: theme.palette.black,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },

    // SONG

    songCardIcon:{
        marginTop:"-3px",
        color:theme.palette.whitesmoke,
        "&:hover":{
            color:theme.palette.red,
        }
    },

    songCard:{
        display:"flex",
        width:"100%",
        background:"black",
        color:"whitesmoke",
        height:"30px",
        borderBottom:"1px dotted #f5f5f5",
        borderRadius:"0px"   
    },

    songListItem:{
        paddingTop:"2px",
        paddingBottom:"2px",
    },

    // SONG PLAYING CARD

    songPlayingContainer:{
        width:"40%",
        justifyContent:"center",
        alignContent:"center",
        height:"100%"
    },
    songPlayingCard:{
        backgroundColor: theme.palette.black,
        border:"1px solid #f5f5f5",
        color:theme.palette.whitesmoke,
        borderRadius:"5px",
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: "-120px",
        marginLeft: "-200px",
        width:"400px",
        height:"320px"
    },

    songPlayingHeader:{
        position: "absolute",
        left: "0%",
        right: "0%",
        top: "0%",
        bottom: "85.14%",
        background: "#262626",
        border: "1px solid #000000",
        boxSizing: "border-box",
        display:"inline-flex",
        height:"30px",
        justifyContent:"space-between"
    },

    songPlayingIcon:{
        marginLeft:"10px"
    },

    songPlayingText:{
        fontSize:"16px",
        marginTop:"3px"

    },

    songPlayingImageContainer:{
        justifyContent:"start",
        alignContent:"left",
        marginTop:"30px",
    },

    songPlayingImageBorder:{
        border:"1px solid #f5f5f5",
        marginRight:"30px",
        marginLeft:"0px",
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius:"0px",
        height:"130px",
        width:"130px"
    },

    songPlayingImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    songPlayingCard1 : {
        width: "auto",
        height: "auto",
        background:"black",
        display:"block",
        justifyContent:"start",
        alignContent:"start",
        marginTop:"40px",
        marginLeft:"7px",

    },

    songPlayingCloseIcon:{
        marginTop:"1px",
        color:"#ba1004",
        "&:hover":{
            color:theme.palette.whitesmoke,
        }
    },

    songPlayingPageHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"10px",
        display:"block",
        textAlign: "left",
    },

    // player
    playerContainer:{
        justifyContent:"center",
        alignContent:"center",
        display:"flex",
        marginTop:"29px",
    },
    audioPlayer:{
        width:"370px", 
        background:"black", 
        "& .rhap_time":{
            color:"whitesmoke"
        },
        "& .rhap_volume-button":{
            color:'whitesmoke'
        },
        "& .rhap_volume-indicator":{
            backgroundColor:"whitesmoke"
        },
        "& .rhap_repeat-button":{
            color:"whitesmoke"
        },
        "& .rhap_progress-indicator":{
            backgroundColor:"#969696",
            border:"1px solid #a9a9a9"
        },
        "& .rhap_progress-bar-show-download":{
            backgroundColor:"whitesmoke"
        },
        "& .rhap_progress-filled":{
            backgroundColor:"#969696"
        },
        "& .rhap_main-controls-button":{
            color:"whitesmoke"
        },
        "& .rhap_additional-controls":{
            display:"none"
        }

    },

    // PLAYLIST

    playlistItem:{
        paddingTop:"2px",
        paddingBottom:"2px",
        marginTop:"5px"
    },

    playlistButton:{
        background: theme.palette.red,
        borderRadius:"10px",
        color:theme.palette.whitesmoke,
        alignSelf:"center",
        height:"40px",
        "&:hover":{
            color:theme.palette.red,
            backgroundColor:theme.palette.whitesmoke,
        },

    },

    playlistButtonEdit:{
        background: theme.palette.red,
        borderRadius:"10px",
        color:theme.palette.whitesmoke,
        alignSelf:"center",
        height:"30px",
        "&:hover":{
            color:theme.palette.red,
            backgroundColor:theme.palette.whitesmoke,
        },
    },

    playlistButtonRemove:{
        background: theme.palette.whitesmoke,
        borderRadius:"10px",
        color:theme.palette.red,
        alignSelf:"center",
        height:"30px",
        "&:hover":{
            color:theme.palette.whitesmoke,
            backgroundColor:theme.palette.red,
        },
    },


    playlistList:{
        width: '100%',
        maxWidth: 480,
        backgroundColor: theme.palette.black,
        position: 'relative',
        overflow: 'auto',
        maxHeight:530,
    },

    playlistCard:{
        display:"flex",
        width:"100%",
        background:"black",
        color:"whitesmoke",
        height:"auto",
        borderRadius:"0px"   
    },

    playlistImageContainer:{
        display:"block",
        justifyContent:"start",
        alignContent:"left",
    },

    playlistImageBorder:{
        border:"1px solid #000000",
        borderRadius:"1000px",
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        height:"60px",
        width:"60px"
    },

    playlistImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    playlistCard1 : {
        width: "auto",
        height: "auto",
        background:"black",
        display:"block",
        justifyContent:"start",
        alignContent:"start",
        marginLeft:"3px",
        marginTop:"-5px"

    },

    playlistArrowIcon:{
        color:theme.palette.whitesmoke,
        "&:hover":{
            color:theme.palette.red,
        }
    },

    playlistEditIcon:{
        color:"#C11003",
        "&:hover":{
            color:theme.palette.whitesmoke,
        }
    },

    playlistPageImageContainer:{
        justifyContent:"start",
        alignContent:"left",
        marginTop:"20px",
        marginLeft:"22px",
    },

    playlistPageImageBorder:{
        border:"1px solid #000000",
        alignItems: "center",
        backgroundImage: "linear-gradient(80deg,#0c0c0c,#0c0c0c)",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius:"1000px",
        height:"150px",
        width:"150px"
    },

    playlistPageImage:{
        objectFit: "contain",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    playlistPageCard1 : {
        width: "auto",
        height: "auto",
        background:"black",
        display:"block",
        marginTop:"35px",
        marginLeft:"40px",

    },

    playlistPageHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"-7px",
        display:"block",
        marginLeft:"15px",
        marginRight:"15px",
    },

    playlistPageContainer:{
        width:"68%",
        display:"flex",
        justifyContent:"center",
    },

    // NEW PLAYLIST

    newPlaylistContainer:{
        width:"68%",
        justifyContent:"center",
        marginTop:"150px",
       
    },

    newPlaylistInputLabel:{
        color:theme.palette.whitesmoke,
        display:"flex",
        alignContent:"left",
    },
    newPlaylistInputLabelH:{
        color:theme.palette.whitesmoke,
        display:"flex",
        alignContent:"left",
        fontSize:"30px",
        marginTop:"7px"
    },
    newPlaylistLabel:{
        color:theme.palette.black,
        backgroundColor:theme.palette.whitesmoke,
        display:"flex",
        alignContent:"left",
        justifyContent:"center",
        marginTop:"5px",
        border:"1px solid whitesmoke",
        borderRadius:"6px",
        paddingTop:"7px",
        paddingBottom:"7px"
    },
    newPlaylistSelect:{
        backgroundColor:theme.palette.whitesmoke,
        marginTop:"5px",
        borderRadius:"6px",
        "&:after": {
            borderBottomColor:theme.palette.red,
        },
        "& .MuiPaper-rounded":{
            borderRadius:"6px"
        },
        "& .MuiPaper-root":{
            top:"250px"
        }
    },
    newPlaylistList1:{
        display:"block",
        justifyContent:"center",
        font:theme.typography.fontFamily,
        alignContent:"center",
    },

    songCardP:{
        display:"flex",
        width:"700px",
        background:"black",
        color:"whitesmoke",
        height:"30px",
        borderRadius:"0px"   
    },

    songCardH:{
        display:"flex",
        width:"700px",
        background:"black",
        color:"whitesmoke",
        height:"30px",
        borderBottom:"1px solid #f5f5f5",
        borderRadius:"0px"   
    },
    playlistButton2:{
        background: theme.palette.red,
        borderRadius:"10px",
        width:"30%",
        color:theme.palette.whitesmoke,
        "&:hover":{
            color:theme.palette.red,
            backgroundColor:theme.palette.whitesmoke,
        }
    },

    playlistInput:{
        background:theme.palette.whitesmoke,
        borderRadius:"10px",
        width:"58%",
        "& .MuiFormLabel-root": {
            color:theme.palette.black,
        },
        "& .MuiFilledInput-underline::after": {
            borderBottomColor:theme.palette.black,
        },
    },


}));
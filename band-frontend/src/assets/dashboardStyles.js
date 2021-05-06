import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    dashContainer:{
        width:"70%",
        display:"flex",
        justifyContent:"center",
        alignContent:"center"
    },

    dashCard : {
        width: "70%",
        height: "550px",
        padding: "20px 20px",
        marginTop:"30px",
        borderRadius:"10px",
        background:"black",
        border:"1px solid #f5f5f5",
    },

    dashGenreHeader:{
        color:theme.palette.whitesmoke,
        marginTop:"-7px",
        display:"flex",
        justifyContent:"space-between",
        marginLeft:"60px",
        marginRight:"60px"
    },

    dashButton:{
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

    dashListContainer:{
        marginTop:"20px",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        width:"100%",
    },

    dashList:{
        width: '100%',
        backgroundColor: theme.palette.black,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },

    font:{
        fontFamily: theme.typography.fontFamily
    },
  
    
}));
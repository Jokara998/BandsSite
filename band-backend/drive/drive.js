const {google} = require("googleapis")
require("dotenv/config")

const oauth2Client = new google.auth.OAuth2({
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    redirectUri:process.env.REDIRECT_URI
})

oauth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN, access_token:process.env.ACCESS_TOKEN})

const drive = google.drive({
    version:"v3",
    auth:oauth2Client,
    headers:{
        "Authorization" : "Bearer "+process.env.ACCESS_TOKEN
    }
})

const getFile = async (fileId, alt, type) =>{
    if(type == "song"){
        return "https://drive.google.com/uc?export=download&id="+fileId+"&key="+process.env.API_KEY
    }else{
        const response = await drive.files.get({
            fileId:fileId,
            alt:alt
        }, {responseType: "stream"} )

        console.log(response.config.url+"&key="+process.env.API_KEY)
        return response.config.url+"&key="+process.env.API_KEY  
    }
    
}

module.exports = {
    getFile,
};
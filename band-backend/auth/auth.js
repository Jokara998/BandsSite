const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports =  (req, res, next) => {
    if(!req.cookies)
        return res.status(401).json({message:"Access Denied!"})

    const authcookie = req.cookies.authcookie;
    jwt.verify(authcookie, process.env.SECRET, (err, data) =>{
        if(err)
            return res.status(401).json({message:"Access Denied!"})
        else if(data){
            req.user = data
            next();
        }    
    })
}
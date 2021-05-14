
const client = async function (req, res, next){
   
    if(req.user.type === "Client"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const moderator = async function (req, res, next){
   
    if(req.user.type === "Moderator"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

module.exports = {
    client,
    moderator, 
}
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = process.env

const createToken = (user) => {
    try{
        const token = jwt.sign({id: user._id, username: user.username, email: user.email}, JWT_SECRET, {expiresIn: "4h"})
        return token
    }catch(err){
        console.log(err)
    }
}

const verifyToken = (req,res,next) => {
    try{
        const bearerHeader = req.headers["authorization"]
        if(!bearerHeader){
            return res.status(403).json({error: "You do not have permission"})
        }
        const decoded = jwt.verify(bearerHeader, JWT_SECRET)
        if(!decoded){
            return res.status(400)
        }
        next()
    }catch (err){
        console.log(err)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {
    createToken,
    verifyToken
}
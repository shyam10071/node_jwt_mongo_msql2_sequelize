const privateKey = "qwerty890zxcvghjkl";
const User = require('../models/mongo/user')
const jwt = require('jsonwebtoken') 

exports.auth = async (req, res, next) => {

    if(req.headers['authorization']){

        let token = req.headers['authorization'];
        token = token.split(' ');
        token = token[1]
        
        const verifyUser = jwt.verify(token, "qwerty890zxcvghjkl")
        
        const userData = await User.findOne({ id: verifyUser.id });
        
        if (!userData) {
            return res.status(400).json({ data: {}, message: "unothorize user", ResponseCode: 400 });
        }
        
        req.token = token
        req.userData = userData
        next()
    }else{
        return res.status(400).json({ data: {}, message: "unothorize user", ResponseCode: 400 });
    }
}
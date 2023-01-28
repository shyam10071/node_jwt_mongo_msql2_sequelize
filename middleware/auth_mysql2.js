const privateKey = "qwerty890zxcvghjkl";
const jwt = require('jsonwebtoken') 
const conn = require('../db/mysql2_db')

exports.auth = async (req, res, next) => {

    if(req.headers['authorization']){

        let token = req.headers['authorization'];
        token = token.split(' ');
        token = token[1]
        
        const verifyUser = jwt.verify(token, "qwerty890zxcvghjkl")
        console.log(verifyUser)
        conn.query("SELECT * FROM users WHERE id = ?", verifyUser.id,async (err, result) => {

            
            if (!result.length) {
                return res.status(400).json({ data: {}, message: "unothorize user", ResponseCode: 400 });
            }
            
            req.token = token
            req.userData = result[0]
            next()
        });
    }else{
        return res.status(400).json({ data: {}, message: "unothorize user", ResponseCode: 400 });
    }
}
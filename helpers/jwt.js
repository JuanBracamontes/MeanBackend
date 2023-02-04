const jwt = require('jsonwebtoken');


const generateJWT = (req) => {
    return new Promise((resolve, reject) =>  {
        const payload = {
            uid: req.uid,
            role: req.role,
            email: req.email
        }
        jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: '24h'
        },(err,token) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(token);
        })
    })
}



module.exports = {
    generateJWT
}
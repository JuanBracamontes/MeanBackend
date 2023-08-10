const jwt = require('jsonwebtoken');

const generateJWT = async (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        console.log(payload);
        jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn:'12h'
        }, (err,token) => {
            if(err) {
                console.log(err);
                reject('Cannot sign jwt please check logs');
            }else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generateJWT
}
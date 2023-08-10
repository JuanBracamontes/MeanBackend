const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok:false,
            msg:'Token was not provided'
        })
    }
    
    try {
        debugger;
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        console.log(uid);
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Invalid token provided'
        })
    }

    //req.uid = uid;

    next();
}

module.exports = {
    validateJWT
}
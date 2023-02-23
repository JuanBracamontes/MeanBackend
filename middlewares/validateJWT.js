const { httpCodes } = require("../enums/httpStatusCodes");
const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    //read token from headers
    const token = req.header('x-token');
    if(!token) {
        return res.status(httpCodes.BadRequest).json({
            ok:false,
            msg: "Invalid token or token not provided"
        })
    }

    try { 
        //validating token with same secret key
        const {uid,role,exp,email} = jwt.verify(token,process.env.JWT_SECRET);

        var expDate = exp * 1000;
        var today =  new Date();

        //validate expired tokens
        if(today > expDate) {
            res.status(httpCodes.InternalServerError).json({
                ok:false,
                msg: "Token expired"
            })
        }

        //adding data to request obj
        req.uid = uid;
        req.role = role;
        req.email = email;
        
        next();
    } catch(err) { 
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: err
        })
    }

    
}


module.exports = {
    validateToken
}
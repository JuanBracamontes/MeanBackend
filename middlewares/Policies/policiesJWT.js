const { httpCodes } = require("../../enums/httpStatusCodes");
const { roleEnum } = require("../../enums/roles");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const onlyAdminPolicy = async (req, res, next) => {
    //read token from headers
    const token = req.header('x-token');
    const {uid,role,email} = jwt_decode(token);
    if(role != roleEnum.Admin) {
        return res.status(httpCodes.Unauthorized).json({
            ok:false,
            msg:`You don't have permission to get the response only ${roleEnum.Admin} users can request this information`
        })
    }
    next();
}

module.exports = {
    onlyAdminPolicy
}
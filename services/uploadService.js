const expressFileUpload = require('express-fileupload');

const _uploadFile = async (data) => {
    const validTypes = ['doctors','hospitals','patient'];
    const {type,id} = req.body;
    if(validTypes.includes(type)){

    }else{
        return {
            ok:false,
            msg:`Invalid type ${type}, avaliable valid types are:  ${validTypes.join(' ,')}`
        }
    }
}

module.exports = {
    _uploadFile
}
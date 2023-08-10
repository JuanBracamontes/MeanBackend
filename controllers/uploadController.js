const {response} = require('express');

const uploadFile = async (req, res = response) => {
    return res.json({
        ok:true,
        msg: "uploading file..."
    })
}

module.exports = {
    uploadFile
}
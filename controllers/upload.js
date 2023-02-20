const {response} = require('express');
const path = require('path');
const fs = require('fs');
const { httpCodes } = require('../enums/httpStatusCodes');
const {v4: uuidv4} = require('uuid');
const {updateImage} = require('../helpers/updateImage')
const {uploadImageDto} = require("../models/dtos/uploadDto")

const fileUpload = async (req, res = response) => {
    try {

        const folder = req.params.folder;
        const id = req.params.id;

        console.log(folder);
        var validFoldersPath = ["medicos","usuarios","hospitales"];
        if(!validFoldersPath.includes(folder)) {
            return res.status(httpCodes.BadRequest).json({
                ok:false,
                msg: `The folder provided: ${folder} is invalid, the folders availabe are [${validFoldersPath.join(' , ')}]`
            })
        }


        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(httpCodes.BadRequest).json({
                ok:false,
                msg: 'No files were uploaded.'
            })
        }

        const imageToUpload = req.files.image;
        const nameSplitted = imageToUpload.name.split('.');
        const fileExtension = nameSplitted[nameSplitted.length - 1];
        const extensionWhiteList = ["jpg","jpeg","png","svg","gif"];

        if(!extensionWhiteList.includes(fileExtension)) {
            return res.status(httpCodes.BadRequest).json({
                ok:false,
                msg: `Invalid file extension, extensions valids ${extensionWhiteList.join(' , ')}`
            })
        }


        //new file name
        const fileName = `${uuidv4()}.${fileExtension}`;
        const path = `./uploads/${folder}/${fileName}`;

        imageToUpload.mv(path, function(err) {
            if (err) {
                console.log(err);
                return res.status(httpCodes.InternalServerError).json({
                    ok:false,
                    msg: err
                })  
            }  
        });

        var imageUpdated = await updateImage(new uploadImageDto({
            id:id,
            folder:folder,
            path:path,
            fileName:fileName
        }));

        if(!imageUpdated) {
            return res.status(httpCodes.InternalServerError).json({
                ok:false,
                msg: "Please check log errors"
            })
        }

        res.json({
            ok:true,
            msg:"uploading file",
            fileName
        })

    }catch(error) {
        console.log(error);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

const getImage = async (req, res) => {
    debugger;
    const folder = req.params.folder;
    const idImage = req.params.idImg;

    const pathImg = path.join(__dirname,`../uploads/${folder}/${idImage}`);
    if(!fs.existsSync(pathImg)){
        return res.status(httpCodes.NotFound).json({
            ok:false,
            msg:"Photo not found"
        })
    }
    res.sendFile(pathImg);
}

module.exports = {
    fileUpload,
    getImage
}

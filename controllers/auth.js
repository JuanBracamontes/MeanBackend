const {response} = require('express');
const { httpCodes } = require('../enums/httpStatusCodes');
const bcrypt = require("bcryptjs");
const {generateJWT} = require('../helpers/jwt')
const Usuario = require('../models/usuario');
const {googleVerify} = require('../helpers/google-verify')

const login = async (req, res = response) => {
    try {
        const {email,password} = req.body;
        //find user by email
        const userFound = await Usuario.findOne({email});
        if(!userFound) {
            res.status(httpCodes.NotFound).json({
                ok:false,
                msg: "Invalid user"
            })
        } else {
            //validate password
            const validPassword = bcrypt.compareSync(password.toString(),userFound.password);
            if(validPassword) {
                //generate token
                var token = await generateJWT({uid:userFound.id,email:userFound.email,role:userFound.role});

                res.json({
                    ok:true,
                    userFound,
                    token
                })
            }else {
                res.status(httpCodes.NotFound).json({
                    ok:false,
                    msg: "Wrong password"
                })
            }
        }

    }catch(error) {
        console.log(error);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

const googleSignIn = async (req,res) => {
    try {
        debugger;
        const {email, name, picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB) {
            usuario = new Usuario({
                nombre:name,
                email,
                password:'#@@#$',
                img: picture,
                google:true
            });
            
        }else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        var token = await generateJWT({uid:usuario.id,email});

        res.json({
            ok:true,
            token,
            usuario
        })
    } catch(err) {
        console.log(err);
        res.status(httpCodes.BadRequest).json({
            ok:false,
            msg: "Invalid token"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}

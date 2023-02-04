const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");
const {httpCodes} = require('../enums/httpStatusCodes');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    const usuarios = await Usuario.find({},'role google id nombre email');
    if(req.role != "USER_ROLE") {
        res.json({
            ok: true,
            usuarios,
            uid:req.uid
        })
    } else {
        res.status(httpCodes.Unauthorized).json( {
            ok:false,
            msg: "You don't have access to see this response"
        })
    }
    
}

const createUser = async (req,res) => {
    const { email, password } = req.body;

    try {
        //validando si el usuario ya existe via email
        const emailAlreadyExist = await Usuario.findOne( {email: email} );
        if(emailAlreadyExist) {
            return res.status(400).json({
                ok: false,
                msg: `This user ${email} already exist`
            })
        }
        
        //mappeando el usuario a una clase entity
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = await bcrypt.hashSync(password.toString(), salt);

        //guardar usuario
        await usuario.save();

        //generate token
        var token = await generateJWT({uid:usuario.id,email:email,role:req.role});

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch(error) {
        console.log(error);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
   
}

const updateUser = async(req,res) => {
    // TODO: validar token y comprobar si el usuario correcto

    //get parameters sended via request
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        //removiendo campos de password y google
        const {password,google,email,...campos} = req.body;
        if(!usuarioDB) {
            return res.status(httpCodes.NotFound).json({
                ok:false,
                msg: "Invalid user id"
            })
        }

        if(usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail) {
                return res.status(httpCodes.BadRequest).json({
                    ok:false,
                    msg: `There's another user using this email: ${req.body.email} `
                })
            }
        }

        campos.email = email;
        const userUpdated = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok:true,
            uid,
            usuario:userUpdated
        })
    } catch(error) { 
        console.log(error);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

const deleteUser = async (req,res = response) => {
    try {
        //get parameters sended via request
        const uid = req.params.id;
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(httpCodes.NotFound).json({
                ok:false,
                msg: "Invalid user id"
            })
        }else {
            await Usuario.findByIdAndRemove(uid);
            res.json({
                ok:true,
                msg: "User deleted"
            })
        }

    } catch(error) { 
        console.log(error);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
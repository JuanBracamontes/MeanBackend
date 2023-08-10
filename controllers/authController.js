const {response} = require('express');
const EntityUser = require('../models/users');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const login = async (req, res = response) =>{
    try {
        const {email,password} = req.body;
        const userFound = await EntityUser.findOne({email});
        if(!userFound) {
            return res.status(404).json({
                ok:false,
                msg:'Email not found'
            })
        }

        //validate password
        const validPassword = bcrypt.compareSync(password,userFound.password);
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'User or email invalid'
            })
        }

        var jwt = await generateJWT(userFound.id);

        res.json({
            ok:true,
            msg:'login success',
            token:jwt
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Something went wrong please check logs'
        })
    }
}


module.exports = {
    login
}
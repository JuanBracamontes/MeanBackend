const EntityUser = require('../models/users');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const nodemailer = require('nodemailer');

const getUsers = async (req,res) => {

    const users = await EntityUser.find({},'nombre email role');

    // var transporter = nodemailer.createTransport({
    //     service:'gmail',
    //     auth: {
    //         user: 'juanbracamontes02@gmail.com',
    //         pass:'qlcjimfhynkqdmhx'
    //     }
    // })

    // var mailOptions = {
    //     from: 'juanbracamontes02@gmail.com',
    //     to: 'juan.bracamontes@sonorasoft.com',
    //     subject: 'Email node js test',
    //     text: 'Hi from nodemailer, this is a simple test, soy yo Juan Bracamonte'
    // }

    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });

    res.json({
        ok:true,
        users
    })
}

const createUser = async (req,res = response) => {
    const {email,password,name} = new EntityUser(req.body);
    try {

        console.log(req.body);
        const emailFound = await EntityUser.findOne({email});
        if(emailFound) {
            return res.status(400).json({
                ok:false,
                msg:`The email ${email} is not available`
            })
        }

        const newUser = new EntityUser(req.body);

        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(password,salt);
       

        await newUser.save();

        var jwt = await generateJWT(newUser.id);
    
        res.json({
            ok:true,
            userCreated:newUser,
            token:jwt
        })

        console.log("Inserto el usuario");

    }catch(err) {
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:"Unexpected error",
            err
        })
    }

    
}

const updateUser = async (req, res = response) => {

 const uid = req.params.uid;
  try {
    const userFound = await EntityUser.findById(uid);

    if(!userFound){
       return  res.status(400).json({
            ok:false,
            msg: 'Invalid user provided'
        })
    }

    const {password,google,email,...campos} = req.body;
    
    if(userFound.email != req.email) {
        const emailFound = await  EntityUser.findOne({email: req.body.email});
        if(emailFound) {
            return res.status(400).json({
                ok:false,
                msg:`The email ${req.body.email} is not available`
            })
        }
    }
    campos.email = email;
    const userUpdated = await EntityUser.findByIdAndUpdate(uid, campos, {new:true});

    res.json({
        ok:true,
        userUpdated
    })
  } catch (err) {
    console.log(err);
  }
}

const deleteUser = async (req, res = response) => {

    const uid = req.params.uid;

    const userFound = await EntityUser.findById(uid);
    if(!userFound) {
        return res.status(400).json({
            ok:false,
            msg:'Invalid user provided'
        })
    }
    await EntityUser.findByIdAndDelete(uid);
    res.json({
        ok:true,
        msg:'User deleted successfully'
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
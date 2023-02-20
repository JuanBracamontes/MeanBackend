const {response} = require('express');
const { Schema } = require('mongoose');
const { httpCodes } = require('../enums/httpStatusCodes');
const Medico = require('../models/doctores');

const getDoctorById = async (req,res) =>  {
    let uid = req.params.id;
    const medicoFound = await Medico.findById(uid)
                                .populate('hospital', 'nombre img');
    console.log(uid);
    if(!medicoFound) {
        return res.status(httpCodes.NotFound).json({
            ok:false,
            msg: "Please provide a valid Doctor Id"
        });
    }

    res.json({
        ok:true,
        medico:medicoFound
    })
}

const getAllDoctors = async (req, res)  => {
    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');

    console.log(medicos);
                                
    if(req.role != "USER_ROLE") {
        res.json({
            ok: true,
            medicos,
            uid:req.uid
        })
    } else {
        res.status(httpCodes.Unauthorized).json( {
            ok:false,
            msg: "You don't have access to see this response"
        })
    }
}

const createDoctor = async (req, res = response) =>  {

    const uid = req.uid;
    const medico = new Medico({usuario:uid,...req.body});
    const medicoFound = await Medico.findOne({usuario: req.body.usuario});
    if(medicoFound) {
        res.status(httpCodes.BadRequest).json({
            ok:false,
            msg:`There's another doctor named ${req.body.nombre}`
        })
    }

    const medicoDB = await medico.save();

    res.json({
        ok:true,
        medico:medicoDB
    })
}

const deleteDoctor = async (req, res = response) => {
    debugger;
    //get parameters sended via request
    const uid = req.params.id;
    const doctorFound = await Medico.findById(uid)
    if(!doctorFound) {
        return res.status(httpCodes.BadRequest).json({
            ok:false,
            msg: "Doctor not found"
        })
    }

    await Medico.findByIdAndRemove(uid);

    res.json({
        ok:true,
        msg: 'borrando un doctor'
    })
}

const updateDoctor = () => {
    res.json({
        ok:true,
        msg: 'actualizando un doctor'
    })
}


module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    deleteDoctor,
    updateDoctor
}
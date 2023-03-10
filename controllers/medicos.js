const {response} = require('express');
const { Schema } = require('mongoose');
const { httpCodes } = require('../enums/httpStatusCodes');
const Medico = require('../models/doctores');
const {checkValidEntity, mapChangesAndUpdate} = require('../helpers/entitiesHelpers')

const entity = "medico";

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
       
    res.json({
        ok: true,
        medicos,
        uid:req.uid
    })
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
    //get parameters sended via request
    const uid = req.params.id;
    var response = await checkValidEntity({id,entity},res);
    if(!response.entityFound) {
        return response.res;
    }

    await Medico.findByIdAndRemove(uid);

    res.json({
        ok:true,
        msg: 'borrando un doctor'
    })
}

const updateDoctor = async (req,res = response)  => {
    try {
        const id  = req.params.id;
        var response = await checkValidEntity({id,entity},res);
        if(!response.entityFound) {
            return response.res;
        }
        const doctorUpdated = await mapChangesAndUpdate({id,usuario:req.uid,changes:{...req.body},entity});
        res.json({
            ok:true,
            doctor:doctorUpdated
        })
    }catch(err) { 
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg:err.message
        })
    }
}


module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    deleteDoctor,
    updateDoctor
}
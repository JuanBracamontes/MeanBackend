const {response} = require('express');
const { httpCodes } = require('../enums/httpStatusCodes');
const Hospital = require('../models/hospital');

const getHospitalById = (req,res = response) => {
    res.json({
        ok:true,
        msg: 'obteniendo hospital by id'
    })
}

const getAllHospitals = async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario','nombre img');
    if(req.role != "USER_ROLE") {
        res.json({
            ok: true,
            hospitales,
            uid:req.uid
        })
    } else {
        res.status(httpCodes.Unauthorized).json( {
            ok:false,
            msg: "You don't have access to see this response"
        })
    }
}

const createHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({usuario:uid,...req.body});
    
    try { 
        const hospitalFound = await Hospital.findOne({nombre:req.body.nombre});
        if(hospitalFound) {
            return res.status(httpCodes.BadRequest).json({
                ok:false,
                msg: `There's another hospital named ${req.body.nombre}`
            })
        }
        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital: hospitalDB
        })
    } catch(err) {
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

const updateHospital = async (req,res = response) => {
    res.json({
        ok:true,
        msg: 'actualizando un hospital'
    })
}


const deleteHospital = async (req,res = response) => {
    res.json({
        ok:true,
        msg: 'borrando un hospital'
    })
}


module.exports = {
    getHospitalById,
    getAllHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
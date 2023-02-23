const {response} = require('express');
const { httpCodes } = require('../enums/httpStatusCodes');
const Hospital = require('../models/hospital');
const {checkValidEntity} = require('../helpers/entitiesHelpers')

const getHospitalById = async (req,res = response) => {
    try {
        const id = req.params.id;
        var response = await checkValidEntity({id,entity:"hospital"},res);
        if(!response.entityFound) {
            return response.res;
        }

        res.json({
            ok:true,
            hospital:response.entity
        })
    }catch (err) {
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: err.message
        })
    }
}

const getAllHospitals = async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario','nombre img');
    res.json({
        ok: true,
        hospitales,
        uid:req.uid
    })
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
    try {
        const id = req.params.id;
        var response = await checkValidEntity({id,entity:"hospital"},res);
        if(!response.entityFound) {
            return response.res;
        }

        const hospitalChanges = {
            ...req.body,
            usuario: req.uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id,hospitalChanges,{new:true}); 

        res.json({
            ok:true,
            hospital: hospitalUpdated,
            msg: 'actualizando un hospital'
        })
    }catch(err) {
        return res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: err.message
        })
    }
}


const deleteHospital = async (req,res = response) => {
    try {
        const id = req.params.id;
        var response = await checkValidEntity({id,entity:"hospital"},res);
        if(!response.entityFound) {
            return response.res;
        }
        
        await Hospital.findByIdAndRemove(id);
        res.json({
            ok:true,
            msg: 'Hospital deleted'
        })
    }catch(err) {
        return res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: err.message
        })
    }
}


module.exports = {
    getHospitalById,
    getAllHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
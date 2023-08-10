const EntityPatient = require('../models/patient');
const EntityHistory = require('../models/patientHistory');
const { response } = require('express');
const { _getPatients } = require('../services/patients');


const getPatients = async(req,res = response) => {
    try {
        const patients = await _getPatients();
        return res.json({
            ok:true,
            patients
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Please check log errors"
        })
    }
}

const createPatient = async(req,res = response) => {
    try {
        const newPatient = new EntityPatient(req.body);
        await newPatient.save();
        res.json({
            ok:true,
            patientCreated:newPatient
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

const setHistoryPatient = async(req,res = response) => {
    try {
        const newHistory = new EntityHistory(req.body);
        await newHistory.save();
        res.json({
            ok:true,
            history:newHistory
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

module.exports = {
    createPatient,
    setHistoryPatient,
    getPatients
}
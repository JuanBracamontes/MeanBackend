const { response } = require('express');
const { _getDoctors, _searchDoctor, _createDoctor } = require('../services/doctorService');

const getDoctors = async (req,res = response) => {
    try {
        const doctors = await _getDoctors();
        res.json({
            ok:true,
            doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

const autocompleteDoctor = async (req,res = response) => {
    try {
        const doctors = await _searchDoctor(req.params.keyword);
        res.json({
            ok:true,
            doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

const createDoctor = async (req, res = response) => {
    try {
        const newDoctor = await _createDoctor(req.body);
        if(!newDoctor.ok){
            return res.status(500).json(newDoctor);
        }
        res.json(newDoctor);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

module.exports = {
    createDoctor,
    getDoctors,
    autocompleteDoctor
}
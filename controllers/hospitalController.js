const { response } = require('express');
const { _createHospital, _getHospitals } = require('../services/hospitalService');



const createHospital = async (req, res = response) => {
    try {
        const newHopital = await _createHospital(req.body);
        res.json({
            ok:true,
            hospitalCreated:newHopital
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

const getHospitals = async(req,res = response) => {
    try {
        const hospitals = await _getHospitals();
        return res.json({
            ok:true,
            hospitals
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Please check error logs",
            error
        })
    }
}

module.exports = {
    createHospital,
    getHospitals
}
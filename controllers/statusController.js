const { generateFilters } = require('../helpers/filterBuilder');
const EntityPatientStatus = require('../models/patientStatus');
const { response } = require('express');

const createStatus = async(req,res = response) => {
    try {
        const newStatus = new EntityPatientStatus(req.body);
        await newStatus.save();
        res.json({
            ok:true,
            statusCreated:newStatus
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Something went wrong, please check logs"
        })
    }
}

const getStatus = async(req,res = response) => {
    try {
        const filters = [
            {column:'representsDanger',value:false},
            {column:'name',value: 'cirugía'},
        ];
        const filtersArr = await generateFilters(filters,true);
        console.log(filtersArr);
        const statuses = await EntityPatientStatus.find({$or:filtersArr});

        res.json({
            ok:true,
            statuses
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
    createStatus,
    getStatus
}
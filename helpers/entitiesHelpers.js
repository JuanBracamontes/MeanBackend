const {response} = require('express');
const { httpCodes } = require('../enums/httpStatusCodes');
const Hospital = require('../models/hospital');
const Medico = require('../models/doctores');
const Usuario = require('../models/usuario');

const checkValidEntity = async(req,res) => {
    var entity = null;
    var objResponse = {};
    switch(req.entity) {
        case "hospital":
            entity = await Hospital.findById(req.id);
        break;
        case "usuario":
            entity = await Usuario.findById(req.id);
        break;
        case "medico":
            entity = await Medico.findById(req.id);
        break;
    }
    if(!entity) {
        objResponse.entityFound = false;
        objResponse.res = res.status(httpCodes.NotFound).json({
            ok:false,
            msg:`Please provide a valid ${req.entity}Id`
        });
        return objResponse;
    }

    return objResponse = {
        entityFound:true,
        entity: entity
    };
}

const mapChangesAndUpdate = async (req) => {
    debugger;
    var entity = null;
    switch(req.entity) {
        case "hospital":
            entity = await Hospital.findByIdAndUpdate(req.id,req.changes,{new:true});
        break;
        case "usuario":
            entity = await Usuario.findByIdAndUpdate(req.id,req.changes,{new:true});
        break;
        case "medico":
            entity = await Medico.findByIdAndUpdate(req.id,req.changes,{new:true});
        break;
    }
    return entity;
}

module.exports = {
    checkValidEntity,
    mapChangesAndUpdate
}
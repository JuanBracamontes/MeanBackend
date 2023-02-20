const Medico = require('../models/doctores');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const fs = require('fs');

const updateImage  = async (data) => {
    switch (data.folder) {
        case 'medicos':
            const medico = await checkAndReturnEntity('medicos',data.id);
            if(medico) {
                await checkIfFileExistOrUpdate('medicos',medico.img);
                medico.img = data.fileName;
                medico.save();
            }else {
                return false;
            }
        break;
        case 'hospitales':
            const hospital = await checkAndReturnEntity('hospitales',data.id);
            if(hospital) {
                await checkIfFileExistOrUpdate('hospitales',hospital.img);
                hospital.img = data.fileName;
                hospital.save();
            }else {
                return false;
            }
        break;
        case 'usuarios':
            const usuario = await checkAndReturnEntity('usuarios',data.id);
            if(usuario) {
                await checkIfFileExistOrUpdate('usuarios',usuario.img);
                usuario.img = data.fileName;
                usuario.save();
            }else {
                return false;
            }
        break;
    }
    return true;

}

async function checkIfFileExistOrUpdate (folder,image) {
    var pathToValidate = `./uploads/${folder}/${image}`;
    var pathExist = fs.existsSync(pathToValidate);
    console.log(pathExist);
    console.log(pathToValidate);
    if(pathExist) {
        //delete old image
        fs.unlinkSync(pathToValidate);
    }
}

async function checkAndReturnEntity(table,uid) {
    var entityFound = {};
    switch(table) {
        case 'medicos':
            entityFound = await Medico.findById(uid);
        break;
        case 'hospitales':
            entityFound = await Hospital.findById(uid);
        break;
        case 'usuarios':
            entityFound = await Usuario.findById(uid);
        break;
    }

    if(!entityFound) {
        console.log(`The ${table}Id provided is not valid`);
        return null;
    }
    return entityFound;
}

module.exports = {
    updateImage
}
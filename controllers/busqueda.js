const {response} = require('express');
const { httpCodes } = require('../enums/httpStatusCodes');
const Hospital = require('../models/hospital');
const Medico = require('../models/doctores');
const Usuario = require('../models/usuario');

const search = async (req, res = response) => {
    try {
        const keyWord = req.params.palabraclave;
        const regex = new RegExp(keyWord,'i');

        const [usuarios,medicos,hospitales] = await Promise.all([
            Usuario.find({nombre: regex}),
            Medico.find({nombre: regex}),
            Hospital.find({nombre: regex})
        ])
        

        res.json({
            ok:true,
            keyWord,
            resultado: usuarios.concat(medicos).concat(hospitales)
        })
    }catch(error) {
        console.log(error);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

const getResultsByCollection = async (req,res = response) => { 
    let data = [];

    try {
        const table = req.params.table;
        const keyWord = req.params.keyword;
        const regex = new RegExp(keyWord,'i');

        switch (table) {
            case 'medicos':
                data = await Medico.find({nombre: regex})
                    .populate('hospital','nombre img');
            break;
            case 'hospital':
                data = await Hospital.find({nombre: regex})
                            .populate('usuario','nombre img');
            break;
            case 'usuarios':
                data = await Usuario.find({nombre: regex});
            break;
            default:
                return res.status(httpCodes.BadRequest).json({
                    ok:false,
                    msg: "Search is only available for [medicos, hospitales, usuarios] controllers"
                });
        }

        res.json({
            ok: true,
            results: data
        })

    } catch(err) { 
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            ok:false,
            msg: 'Unexpected error ... please, check the logs errors'
        })
    }
}

module.exports = {
    search,
    getResultsByCollection
}

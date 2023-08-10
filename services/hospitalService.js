const { generateFilters } = require('../helpers/filterBuilder');
const EntityHospital = require('../models/hospital');

const _createHospital = async(data) => {
    const newHospital = new EntityHospital(data);
    await newHospital.save();
    return newHospital;
}


const _getHospitals = async() => {
    const hospitals = await EntityHospital.find();
    return hospitals;
}



module.exports = {
    _createHospital,
    _getHospitals
}
const { generateFilters } = require('../helpers/filterBuilder');
const EntityPatients = require('../models/patient');

const _getPatients = async() => {
    const patients = await EntityPatients.find()
                            .populate('assignedDoctor','firstname lastname area');
    return patients;
}

module.exports = {
    _getPatients
}
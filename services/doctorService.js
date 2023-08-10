const { generateFilters } = require('../helpers/filterBuilder');
const EntityDoctor = require('../models/doctors');

const _searchDoctor = async (data) => {
    const columns = [{column:'area'},{column:'professionalId'},{column:'name'},{column:'email'}];
    const filtersArr = await generateFilters(columns,true,data);
    const doctors = await EntityDoctor.find({$or:filtersArr}).limit(5);
    return doctors;
}

const _getDoctors = async() => {
    const doctors = await EntityDoctor.find()
                            .populate('hospital','name img');
    return doctors;
}

const _createDoctor = async(data) => {

    const doctorFound = await EntityDoctor.findOne({professionalId:data.professionalId});
    if(doctorFound){
        return {
            ok:false,
            msg:"Doctor is already in database"
        };
    }


    const newDoctor = new EntityDoctor(data);
    await newDoctor.save();
    return  {
        ok:true,
        newDoctor
    }
}

module.exports = {
    _searchDoctor,
    _getDoctors,
    _createDoctor
}
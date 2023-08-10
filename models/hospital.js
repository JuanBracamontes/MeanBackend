const {Schema,model, default: mongoose} = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phone: {
        type:Number
    },
    city: {
        type:String,
        required:true
    },
    postcode: {
        type:Number
    },
    neighbourhood : {
        type:String,
        required:true
    }
})

HospitalSchema.method('toJSON',function() {
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Hospital',HospitalSchema);
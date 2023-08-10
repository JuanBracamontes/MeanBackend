const {Schema,model, default: mongoose} = require('mongoose');

const PatientSchema = Schema({
    name: {
        type:String,
        required:true
    },
    img: {
        type:String,
    },
    status: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"PatientStatus"
    },
    isAtTheHospital:{
        type:Boolean,
        default:true
    },
    assignedDoctor: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    }],
    age: {
        type:Number,
        required:true
    },
    dateOfBirth: {
        type:Date,
        required:true
    },
    nss: {
        type:Number,
        required:true
    },
    patientHistory: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"patientHistory"
        }
    ]

})

PatientSchema.method('toJSON',function() {
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Patient',PatientSchema);
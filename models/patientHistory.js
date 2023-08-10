const {Schema,model, default: mongoose} = require('mongoose');

const PatientHistorySchema = Schema({
    description: {
        type:String,
        required:true
    },
    date: {
        type:Date
    },
    doctorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    patientId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    patientStatus: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"patientStatus"
    }
})

PatientHistorySchema.method('toJSON',function() {
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('PatientHistory',PatientHistorySchema);
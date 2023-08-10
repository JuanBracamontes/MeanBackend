const {Schema,model, default: mongoose} = require('mongoose');

const DoctorSchema = Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    area: {
        type:String,
        required:true
    },
    professionalId: {
        type:String,
        required:true
    },
    img: {
        type:String,
    },
    email: {
        type:String,
        required:true
    },
    hospital: {
        type:mongoose.Types.ObjectId,
        ref:"Hospital"
    }
})

DoctorSchema.method('toJSON',function() {
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Doctor',DoctorSchema);
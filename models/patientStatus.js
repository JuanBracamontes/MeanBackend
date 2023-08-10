const {Schema,model} = require('mongoose');

const PatienStatusSchema = Schema({
    name: {
        type:String,
        required:true
    },
    representsDanger: {
        type:Boolean,
        default:false,
        required:true
    },
    active: {
        type:Boolean,
        default:true
    }
})

PatienStatusSchema.method('toJSON',function() {
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('PatientStatus',PatienStatusSchema);
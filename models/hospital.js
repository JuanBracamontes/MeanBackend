const {Schema,model} = require('mongoose');

const HospitalSchema = Schema({
    nombre : {
        type: String,
        require: true
    },
    img : {
        type:String
    },
    usuario: {
        require:true,
        //adding reference to user table
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {collection: 'Hospitales'})

//remappeando objeto a retornar
HospitalSchema.method('toJSON', function() {
    // extrayendo version, id y password del objeto a retornar 
    const {__v,_id, ...object} = this.toObject();
    //asingando el id a una propiedad custom
    object.id = _id;
    return object;
})

module.exports = model('Hospital',HospitalSchema);
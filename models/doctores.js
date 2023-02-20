const {Schema,model} = require('mongoose');

const MedicosSchema = Schema({
    nombre : {
        type: String,
        require: true
    },
    img : {
        type:String
    },
    usuario: {
        //adding reference to user table
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require:true
    },
    hospital: {
        //adding reference to hospital table
        type:Schema.Types.ObjectId,
        ref: 'Hospital',
        require:true
    }
}, {collection: 'Medicos'})

//remappeando objeto a retornar
MedicosSchema.method('toJSON', function() {
    // extrayendo version, id y password del objeto a retornar 
    const {__v,_id, ...object} = this.toObject();
    //asingando el id a una propiedad custom
    object.id = _id;
    return object;
})

module.exports = model('Medico',MedicosSchema);
const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre : {
        type: String,
        require: true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    img : {
        type:String
    },
    role : {
        type:String,
        required:true,
        default: 'USER_ROLE'
    },
    google : {
        type:Boolean,
        default:false
    },
})

//remappeando objeto a retornar
UsuarioSchema.method('toJSON', function() {
    // extrayendo version, id y password del objeto a retornar 
    const {__v,_id,password, ...object} = this.toObject();
    //asingando el id a una propiedad custom
    object.uid = _id;
    return object;
})

module.exports = model('Usuario',UsuarioSchema);
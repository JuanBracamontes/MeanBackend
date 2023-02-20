const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const expressFileUpload = require('express-fileupload');

// Crear el servidor de express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

app.use(expressFileUpload());

// inicializando connecion a mongodb
dbConnection();
let port = parseInt(process.env.PORT);

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/busqueda', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/upload'));


app.listen(port,'',() => {
    console.log(`Server running in port: `+port);
})

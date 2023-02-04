const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Crear el servidor de express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

// inicializando connecion a mongodb
dbConnection();
let port = parseInt(process.env.PORT);

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(port,'',() => {
    console.log(`Servidor corriendo en el puerto: `+port);
})

console.log("Hola mundo")
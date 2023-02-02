const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Crear el servidor de express
const app = express();

//configurar cors
app.use(cors());

// inicializando connecion a mongodb
dbConnection();
let port = parseInt(process.env.PORT);
console.log(port);

app.get('/',(req,resp) => {
    resp.json({
        ok: true,
        msg: "Hola mundo"
    })
})



app.listen(port,'',() => {
    console.log(`Servidor corriendo en el puerto: `+port);
})

console.log("Hola mundo")
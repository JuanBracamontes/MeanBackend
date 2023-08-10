const express = require('express');
const {dbConnection} = require('./database/config')
const cors = require('cors');
require('dotenv').config();



//creating express server
const app = express();

//configuring cors
app.use(cors());

//reading request body params
app.use(express.json());

//call method to establish db connection with mongo
dbConnection();
const prefix = '/api';
app.use(`${prefix}/users`,require('./routes/usuariosRoutes'));
app.use(`${prefix}/auth`,require('./routes/authRoutes'));
app.use(`${prefix}/doctors`,require('./routes/doctorRoutes'));
app.use(`${prefix}/patients`,require('./routes/patientRoutes'));
app.use(`${prefix}/status`,require('./routes/statusRoutes'));
app.use(`${prefix}/hospitals`,require('./routes/hospitalRoutes'));
app.use(`${prefix}/upload`,require('./routes/uploadRoutes'));

const io = require('socket.io')(5001,{
    cors: {
        origin:'*'
    }
});

io.on('connection',function(socket) {
    socket.on('send-message', function(data) {
        messages.push(data);
        socket.emit('text-event', messages);

    })
})


app.listen(process.env.PORT, () => {
    console.log(`Now server is running in port: ${process.env.PORT}`);
});
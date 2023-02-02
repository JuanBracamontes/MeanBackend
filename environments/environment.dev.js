require('dotenv').config();
const environment = {
    Port: process.env.PORT
}

console.log(`Port impreso desde environment.dev ${environment.Port}`);

module.exports = {
    environment
}
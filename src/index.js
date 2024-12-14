require('dotenv').config();
const App = require('./client/App');

const client = new App();

module.exports = client;

client.connect();

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
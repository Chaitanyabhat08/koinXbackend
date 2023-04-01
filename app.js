const express = require('express');
//route imports
const ether = require('./routers/ether');
const app = express();
app.use(express.json());
app.use("/api/v1/", ether);

module.exports = app;
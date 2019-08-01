const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();



mongoose
    .connect(config.database.url, config.database.options)
    .then(() => app.listen(config.server.port))
    .catch(err => console.log(err))    

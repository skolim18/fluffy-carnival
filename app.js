const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyparser = require('body-parser');
const UserRoutes = require('./routers/users');
const User = require('./models/users');


const app = express();
app.use(bodyparser.json());
app.use(UserRoutes)


mongoose
    .connect(config.database.url, config.database.options)
    .then(() => app.listen(config.server.port))
    .catch(err => console.log(err))    

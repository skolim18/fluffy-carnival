const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => res.status(404).send('Cannot connect to DataBase!'));
mongoose.connect(config.url)
    .then(
        () => db.seedDb(
            () => app.listen(9090,
                () => console.log('Server started on PORT: 9090'))
        )
    )
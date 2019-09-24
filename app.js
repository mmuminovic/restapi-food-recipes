const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeRoutes = require('./api/routes/recipes');

const MONGODB_URI = 'mongodb+srv://Muhamed:' + process.env.MONGO_ATLAS_PW + '@cluster0-nulcu.mongodb.net/foodrecipes?retryWrites=true&w=majority';

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Origin, X-Requested-With');
    if (req.method === 'OPTIONS') {
        setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/recipes', recipeRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

mongoose
    .connect(MONGODB_URI, { useMongoClient: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });



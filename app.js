const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const randomstring = require('randomstring');

const Admin = require('./modules/admin');

const env = process.env;

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('json spaces', 2);

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(mdb)
    .then((connection) => {
        console.log('Connected');
        app.listen(env.PORT || 5000);
    })
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.status(200);

    const object = {
        'message': 'welcome to TFA dashboard API service'
    }

    res.send(object);
});

app.post('/api/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const userData = req.body;

    res.send(userData);
});

app.post('/api/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const userData = req.body;

    res.send(userData);
});
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const env = process.env;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(mdb)
    .then((connection) => {
        console.log('Connected');
        app.listen(5000);
    })
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/panel', (req, res) => {
    res.render('panel');
});

app.get('/auth', (req, res) => {
    res.render('auth');
});
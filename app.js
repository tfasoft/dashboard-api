const express = require('express');
const mongoose = require('mongoose');
const randomstring = require('randomstring');

const Admin = require('./modules/admin');
const User = require('./modules/user');

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

app.post('/login', (req, res) => {
    Admin.findOne(req.body)
        .orFail((fail) => res.send('User not found.'))
        .then((user) => res.send(user))
        .catch((error) => res.send(error));
});

app.post('/register', (req, res) => {
    const data = {
        access_token: randomstring.generate({length: 25, charset: 'alphabetic'}),
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    };

    const newAdmin = new Admin(data);

    newAdmin.save()
        .then((result) => res.redirect('/panel'))
        .catch((error) => res.send(error));
});
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const randomstring = require('randomstring');

const Admin = require('./modules/admin');
const User = require('./modules/user');

require('dotenv').config();
const env = process.env;

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.set('trust proxy', 1);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'thesecretkey',
    resave: false,
    cookie: { maxAge: oneDay },
    saveUninitialized: true
}))

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(mdb)
    .then((connection) => {
        console.log('Connected');
        app.listen(env.PORT || 5000);
    })
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/panel', (req, res) => {
    if (!req.session.user) res.redirect('/auth');
    else {
        Admin.findById(req.session.user)
            .then((user) => {
                res.render('panel', {user});
            })
            .catch((error) => res.send(error));
    }
});

app.get('/auth', (req, res) => {
    if (req.session.user) res.redirect('/panel');
    else res.render('auth');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/login', (req, res) => {
    Admin.findOne(req.body)
        .then((user) => {
            if (user === null) {
                res.send('User not found.')
            } else {
                req.session.user = user.id;

                res.redirect('/panel');
            }
        })
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
        .then((result) => {
            req.session.user = result.id;

            res.redirect('/panel');
        })
        .catch((error) => res.send(error));
});
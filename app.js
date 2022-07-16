const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const randomstring = require('randomstring');

const Admin = require('./modules/admin');

const env = process.env;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('json spaces', 2);

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(mdb)
    .then((connection) => {
        console.log('Connected');
        app.listen(env.PORT || 5000);
    })
    .catch((error) => console.log(error));

app.post('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const object = {
        'message': 'welcome to TFA dashboard API service'
    }

    res.status(200);

    res.send(object);
});

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    Admin.findOne(req.body)
        .then((user) => {
            if (user === null) {
                const outData = {
                    error: "user not found"
                }

                res.status(401);
                res.send(outData);
            } else {
                const outData = {
                    user
                }

                res.status(200);
                res.send(outData);
            }
        })
        .catch((error) => {
            const outData = {
                error: error.message
            }

            res.status(500);
            res.send(outData);
        });
});

app.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const data = {
        access_token: randomstring.generate({length: 25, charset: 'alphabetic'}),
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    };

    const newAdmin = new Admin(data);

    newAdmin.save()
        .then((user) => {
            const outData = {
                user
            }

            res.status(200);
            res.send(outData);
        })
        .catch((error) => {
            const outData = {
                error: error.message
            }

            res.status(500);
            res.send(outData);
        });
});

// app.listen(env.PORT || 5000);
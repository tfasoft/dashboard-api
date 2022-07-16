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

// const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;
// mongoose.connect(mdb)
//     .then((connection) => {
//         console.log('Connected');
//         app.listen(env.PORT || 5000);
//     })
//     .catch((error) => console.log(error));

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

    const data = req.body;

    if (data.username === "amir" && data.password === "amir") {
        const out = {
            user: {
                uid: "amir"
            }
        }

        res.status(200);
        res.send(out);
    } else {
        const out = {
            message: "user not found"
        }

        res.status(401);
        res.send(out);
    }
});

app.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const userData = req.body;

    res.status(200);
    res.send(userData);
});

app.listen(env.PORT || 5000);
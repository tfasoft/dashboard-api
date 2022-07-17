const express = require('express');

const routes = require('./routes/routes');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('json spaces', 2);

app.use(routes);

module.exports = app;
const express = require('express');
const cors = require('cors');

const routes = require('./routes/routes');
const AuthenticationRoutes = require('./routes/AthenticationRoutes');
const ChangeRoutes = require('./routes/ChangeRoutes');
const GetDataRoutes = require('./routes/GetDataRoutes');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.set('json spaces', 2);

app.use('/auth', AuthenticationRoutes);
app.use('/change', ChangeRoutes);
app.use('/get', GetDataRoutes);

module.exports = app;
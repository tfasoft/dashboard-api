const Admin = require("../models/admin");
const randomstring = require("randomstring");

// Index
const index = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const object = {
        'message': 'welcome to TFA dashboard API service'
    }

    res.status(200);

    res.send(object);
}

module.exports = {
    index,
}
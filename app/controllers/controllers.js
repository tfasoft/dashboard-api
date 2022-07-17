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

// Login admin
const loginAdmin = (req, res) => {
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
                    id: user._id
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
}

// Register admin
const registerAdmin = (req, res) => {
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
                id: user._id
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
}

// Get admin
const getAdmin = (req, res) => {
    Admin.findById(req.body.uid)
        .then((user) => {
            if (user === null) {
                const outData = {
                    error: "user not found"
                }

                res.status(401);
                res.send(outData);
            } else {
                res.status(200);
                res.send(user);
            }
        })
        .catch((error) => {
            const outData = {
                error: error.message
            }

            res.status(500);
            res.send(outData);
        });
}

module.exports = {
    index,
    loginAdmin,
    registerAdmin,
    getAdmin,
}
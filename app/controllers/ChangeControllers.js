const Admin = require("../models/admin");

// Change Name
const changeName = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    Admin.findByIdAndUpdate(req.body.id, {name: req.body.name})
        .then((result) => {
            const outData = {
                "message": "name changed"
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

module.exports = {
    changeName,
}
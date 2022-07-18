const Admin = require("../models/admin");

// Change Name
const changeName = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    // Admin.findOne(req.body)
    //     .then((user) => {
    //         if (user === null) {
    //             const outData = {
    //                 error: "user not found"
    //             }
    //
    //             res.status(401);
    //             res.send(outData);
    //         } else {
    //             const outData = {
    //                 id: user._id
    //             }
    //
    //             res.status(200);
    //             res.send(outData);
    //         }
    //     })
    //     .catch((error) => {
    //         const outData = {
    //             error: error.message
    //         }
    //
    //         res.status(500);
    //         res.send(outData);
    //     });

    res.status(200);

    res.send(req.body);
}

module.exports = {
    changeName,
}
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("../config/keys");

router.get("/", auth, async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(error) {
        console.error(error.message);
    }
});

router.post("/",[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "PPassword is required").exists()
] , async (req, res) => {

    // checking if the data passed in the body is valid or not
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const { email, password } = req.body;

        // this returns a Promise
        let user = await User.findOne({
            email
        })

        if(!user) {
            return res.
                status(400).
                json({errors: [{msg: "Invalid username or password"}]});
        } else {
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return res.
                status(400).
                json({errors: [{msg: "Invalid username or password"}]});
            }

            const payload = {
                user: {
                    id: user.id,
                }
            };

            // create a unique auth token for the user
            jwt.sign(payload, config.jwtSecret, 
                {expiresIn: 3600*24}, 
                (err, token) => {
                if(err) {
                    throw err;
                }
                res.json({ token })
            })
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
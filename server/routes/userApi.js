const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

router.get("/", (req, res) => {
    res.send("User Route");
});

router.post("/",[
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "password should have atleast 5 characters").isLength({min: 5})
] , async (req, res) => {

    // checking if the data passed in the body is valid or not
    const errors = validationResult(req);
    // console.log(req.body);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const { name, email, password } = req.body;

        // this returns a Promise
        let user = await User.findOne({
            email
        })

        if(user) {
            return res.status(400).json({errors: [{msg: "User already exists"}]});
        } else {
            user = new User({
                name, email, password
            });
            user.save();
            res.send("User Route for posting");
        }
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;
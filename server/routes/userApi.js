const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
    res.send("User Route");
});

router.post("/",[
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "password should have atleast 5 characters").isLength({min: 5})
] ,(req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        res.send("User Route for posting");
    } catch(error) {
        console.log(error);
    }
    res.send("User Route");
});

module.exports = router;
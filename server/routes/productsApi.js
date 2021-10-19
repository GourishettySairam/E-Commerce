const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Product");

router.post("/", [auth, [
    check("name", "Name is Required").not().isEmpty(),
    check("description", "description is Required").not().isEmpty(),
    check("category", "category is Required").not().isEmpty(),
    check("Price", "Price is Required").not().isEmpty(),
    check("quantity", "quantity is Required").not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { name, description, cateogory, price, quantity } = req.body;
        const newProduct = Product({
            userId: req.user.id,
            name,
            description,
            category,
            price,
            brand,
            quantity
        });
    
        const product = await newProduct.save();
        res.json({ product });
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

router.get("/", (req, res) => {
    res.send("Product Route");
});

module.exports = router;
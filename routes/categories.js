const express = require('express');
const mongoose = require('mongoose');

const Category = mongoose.model("Category");

const router = express.Router();

router.get('/categories', (req, res) => {
    Category.find()
        .then((categories) => {
            res.json({
                categories
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post('/new-category', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(422).json({
            error: "All fields are required"
        });
    }

    const category = new Category({
        name
    })

    category.save()
        .then((category) => {
            res.json({
                message: "Category has been created",
                category
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

module.exports = router;
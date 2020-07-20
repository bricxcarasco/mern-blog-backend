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

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');

const Category = mongoose.model("Category");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

const router = express.Router();

router.post('/new-comment', (req, res) => {

});

router.get('/comments', (req, res) => {
    Comment.find({

    })
    .populate("post", "_id title")
    .sort('-createdAt')
    .then((comments) => {
        res.json({
            comments
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;
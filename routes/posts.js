const express = require('express');
const mongoose = require('mongoose');

const Post = mongoose.model("Post");

const router = express.Router();

router.get('/posts', (req, res) => {
    Post.find()
        .populate("category", "_id name")
        .then((posts) => {
            res.json({
                posts
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;
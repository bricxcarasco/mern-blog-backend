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

router.post('/new-post', (req, res) => {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
        return res.status(422).json({
            error: "All fields are required"
        });
    }

    const post = new Post({
        title,
        description,
        imageUrl
    });

    post.save()
        .then((post) => {
            res.json({
                message: "Post has been created",
                post
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;
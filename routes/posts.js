const express = require('express');
const mongoose = require('mongoose');

const Category = mongoose.model("Category");
const Post = mongoose.model("Post");

const router = express.Router();

router.post('/new-post', (req, res) => {
    const { title, description, imageUrl, category, isFeatured } = req.body;

    if (!title || !description || !imageUrl || !category) {
        return res.status(422).json({
            error: "All fields are required"
        });
    }

    Category.findOne({ 
            _id: category._id
        })
        .then((category_result) => {
            const post = new Post({
                title,
                description,
                imageUrl,
                isFeatured,
                category: category_result
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
        })
        .catch((error) => {
            console.log(error);
        });
});

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

router.get('/featured-post', (req, res) => {
    Post.find({
        isFeatured: true
    })
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

router.get('/trending-posts', (req, res) => {
    Post.find()
        .populate("category", "_id name")
        .sort('-likes')
        .then((posts) => {
            res.json({
                posts
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get('/fresh-stories', (req, res) => {
    Post.find()
        .sort('-createdAt')
        .limit(3)
        .populate('category', '_id name')
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
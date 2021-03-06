const express = require('express');
const mongoose = require('mongoose');

const Category = mongoose.model("Category");
const Post = mongoose.model("Post");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.get('/search/:query', (req, res) => {
    if (!req.params.query) {
        return res.status(422).json({
            error: "URL not found"
        });
    }

    Post.find({
        $text: {
            $search: req.params.query
        }
    })
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

router.get('/posts/:postId', (req, res) => {
    if (!ObjectId.isValid(req.params.postId)) {
        return res.status(422).json({
            error: "URL not found"
        });
    }

    Post.findById(req.params.postId)
        .populate("category", "_id name")
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    error: "Post not found"
                });
            }
            res.json(post);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get('/posts/category/:categoryId', (req, res) => {
    if (!ObjectId.isValid(req.params.categoryId)) {
        return res.status(422).json({
            error: "URL not found"
        });
    }

    Post.find({
        category: req.params.categoryId
    })
    .sort('-createdAt')
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
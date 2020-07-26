const express = require('express');
const mongoose = require('mongoose');

const Category = mongoose.model("Category");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.post('/new-comment', (req, res) => {
    const { comment, post } = req.body;

    if (!comment || !post || !ObjectId.isValid(post)) {
        return res.status(422).json({
            error: "Comment and post are required"
        });
    }

    Post.findOne({
        _id: post
    })
    .populate('post', '_id title')
    .then((checkPost) => {
        if (!checkPost) {
            return res.status(422).json({
                error: "Post not found"
            });
        }

        const newComment = new Comment({
            comment,
            post
        });

        newComment.save()
            .then((comment) => {
                res.json({
                    message: "Comment has been posted",
                    comment
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

router.get('/comments/:postId', (req, res) => {
    if (!ObjectId.isValid(req.params.postId)) {
        return res.status(422).json({
            error: "Invalid url format"
        });
    }

    Post.findById(req.params.postId)
    .then((post) => {
        console.log(post);
        if (!post) {
            return res.status(422).json({
                error: "Post not found"
            });
        }

        Comment.find({
            post: req.params.postId
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
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;
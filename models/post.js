const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const post = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true
});

mongoose.model('Post', post);
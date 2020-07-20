const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const category = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('Category', category);
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { MONGODB_URI } = require('./config/keys');
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB is connected!");
});

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error ${err}`);
});

require('./models/category');
require('./models/post');

app.use(express.json());
app.use(require('./routes/categories'));
app.use(require('./routes/posts'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
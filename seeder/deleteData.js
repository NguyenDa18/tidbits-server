const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Post.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    }
    catch (err) {
        console.error(err);
    }
};

deleteData();
const mongoose = require('mongoose');
exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');
    }
    catch (err) {
        console.error(err.message);

        // Exit process on error
        process.exit(1);
    }
};
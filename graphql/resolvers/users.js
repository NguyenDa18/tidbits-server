const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async register(_,
            {
                registerInput: {
                    username, email, password, confirmPassword,
                },
            }, context, info) {
            // validate user data
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return {
                ...res._doc,
                id: res._id,
                token
            };

            // make sure user doesn't already exist

            // hash pwd

            // create auth token
        },
    },
};

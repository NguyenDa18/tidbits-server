const User = require('../../models/User');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { generateToken } = require('../../utils/auth');

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };

        },

        async register(_,
            {
                registerInput: {
                    username, email, password, confirmPassword,
                },
            }) {
            // validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });

            // make sure user doesn't already exist
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            // hash pwd
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                // createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            // create auth token
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
    },
};

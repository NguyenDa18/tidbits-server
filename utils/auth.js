const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const generateToken = ({
    id,
    email,
    username
}) => {
    const token = jwt.sign({
        id,
        email,
        username
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Middleware to check JWT in header
const checkAuth = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            }
            catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer <token>\' ');
    }
    throw new Error('Authorization header must be provided');
};

const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports = {
    generateToken,
    checkAuth,
    emailRegex
};
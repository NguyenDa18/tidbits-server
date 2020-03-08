const jwt = require('jsonwebtoken');

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

const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports = {
    generateToken,
    emailRegex
};
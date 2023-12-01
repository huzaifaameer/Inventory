const jwt = require("jsonwebtoken");
const { errorResponse } = require('../utils/response')

const verifyToken = (req, res, next) => {

    let token = extractToken(req)

    if (!token) {
        return res.send(errorResponse("Auth token is required for authentication"))
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.send(errorResponse("Invalid Token"))
    }
};

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
}

module.exports = verifyToken;
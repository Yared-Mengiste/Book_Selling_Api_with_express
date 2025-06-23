import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from '../utils/AppError.js';

// Load environment variables from .env file
dotenv.config();
const { JWT_SECRET } = process.env;

// Middleware to authenticate requests using JWT
const authenticate = (req, res, next) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    // If no Authorization header or it doesn't start with 'Bearer ', return 401 Unauthorized
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return next(new AppError('Unauthorized', 401));

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach the decoded user info to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If token is invalid or expired, return 401 Unauthorized
        next(new AppError('Token invalid or expired', 401));
    }
};

export default authenticate;

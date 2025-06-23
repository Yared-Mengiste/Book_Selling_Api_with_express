import AppError from "../utils/AppError.js"

// Middleware to authorize user based on roles
const authorize = (...roles) => (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role))
        // If not, return 403 Forbidden error
        next(new AppError('Forbidden', 403));

    // If authorized, proceed to the next middleware or route handler
    next();
}

export default authorize;
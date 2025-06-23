import validateBody from "../utils/validateBody.js";
import validateParams from "../utils/validateParams.js";
import validateQuery from "../utils/validateQuery.js";
import cleanupUploaded from "../utils/cleanupUploaded.js";

// Middleware to validate request body, params, and query using provided schemas
const validate = (bodySchema = null, paramsSchema = null, querySchema = null) => (req, res, next) => {
    try {
        // Validate request body if schema is provided
        if (bodySchema)
            req.validBody = validateBody(bodySchema, req.body || {});

        // Validate request params if schema is provided
        if (paramsSchema)
            req.validParams = validateParams(paramsSchema, req.params || {});

        // Validate request query if schema is provided
        if (querySchema)
            req.validQuery = validateQuery(querySchema, req.query || {});

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If validation fails, delete uploaded file if it exists
        cleanupUploaded(req.file); // deletes uploaded file if it exists
        // Pass the error to the error handler
        next(err);
    }
};

export default validate;
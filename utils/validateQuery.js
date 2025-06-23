import AppError from '../utils/AppError.js';

const validateQuery = (schema, query) => {
    const { error, value } = schema.validate(query, { abortEarly: false });

    if (error)
        throw new AppError(error.message, 400);

    return value
}

export default validateQuery;
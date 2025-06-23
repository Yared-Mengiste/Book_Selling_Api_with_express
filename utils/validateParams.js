import AppError from '../utils/AppError.js';

const validateParams = (schema, params) => {
    const { error, value } = schema.validate(params, { abortEarly: false });

    if (error)
        throw new AppError(error.message, 400);

    return value
}

export default validateParams;
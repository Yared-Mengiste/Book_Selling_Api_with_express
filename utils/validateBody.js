import AppError from '../utils/AppError.js';

const validateBody = (schema, body) => {
    const { error, value } = schema.validate(body, { abortEarly: false });

    if (error)
        throw new AppError(error.message, 400);

    return value;
}

export default validateBody;
import Joi from 'joi';

const createUserDto = (Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().length(10).required(),
    role: Joi.string().valid('buyer', 'seller').required(),
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(30).required()
}));

export default createUserDto;
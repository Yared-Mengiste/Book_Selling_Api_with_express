import Joi from 'joi';

const updateUserDto = (Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().length(10).required(),
}));

export default updateUserDto;
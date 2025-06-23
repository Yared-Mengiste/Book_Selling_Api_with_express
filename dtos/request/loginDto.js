import Joi from "joi"

const loginDto = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(30).required()
});

export default loginDto;


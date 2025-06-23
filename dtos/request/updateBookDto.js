import Joi from "joi";

const updateBookDto = Joi.object({
    isbn: Joi.string().length(13).required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0).required(),
    coverImage: Joi.string().empty('')
});

export default updateBookDto;
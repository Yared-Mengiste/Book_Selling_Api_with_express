import Joi from "joi";

const getBooksQueryDto = Joi.object({
    isbn: Joi.string().max(13).empty(''),
    title: Joi.string().empty(''),
    author: Joi.string().empty(''),
    genre: Joi.string().empty(''),
    minPrice: Joi.number().min(0).empty(''),
    maxPrice: Joi.number().min(0).empty(''),
    sortBy: Joi.string().valid('title', 'author', 'price').empty('').default('title'),
    sortOrder: Joi.string().valid('asc', 'desc').empty('').default('asc'),
    page: Joi.number().integer().positive().empty('').default(1),
    limit: Joi.number().integer().positive().empty('').default(2)
});

export default getBooksQueryDto;
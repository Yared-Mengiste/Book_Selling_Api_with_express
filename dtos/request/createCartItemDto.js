import Joi from "joi";

const createCartItemDto = Joi.object({
    bookId: Joi.string().required()
});

export default createCartItemDto;
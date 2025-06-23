import Joi from "joi";

const deleteCartItemParamsDto = Joi.object({
    bookId: Joi.string().required()
});

export default deleteCartItemParamsDto;
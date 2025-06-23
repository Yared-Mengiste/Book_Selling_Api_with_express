import Joi from "joi";

const getBookParamsDto = Joi.object({
    id: Joi.string().required()
});

export default getBookParamsDto;
import Joi from "joi";

const deleteBookParamsDto = Joi.object({
    id: Joi.string().required()
});

export default deleteBookParamsDto;
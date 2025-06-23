import Joi from "joi";

const updatedBookParamsDto = Joi.object({
    id: Joi.string().required()
});

export default updatedBookParamsDto;
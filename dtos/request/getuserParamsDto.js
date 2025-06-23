import Joi from "joi";

const getUserParmasDto = Joi.object({
    id: Joi.string().required()
});

export default getUserParmasDto;
import Joi from "joi";

const getOrdersQueryDto = Joi.object({
    page: Joi.number().integer().positive().empty('').default(1),
    limit: Joi.number().integer().positive().empty('').default(20)
});

export default getOrdersQueryDto;
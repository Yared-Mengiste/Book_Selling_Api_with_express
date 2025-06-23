import Joi from "joi";

const getOwnedBooksQueryDto = Joi.object({
    page: Joi.number().integer().positive().empty('').default(1),
    limit: Joi.number().integer().positive().empty('').default(2)
});

export default getOwnedBooksQueryDto;
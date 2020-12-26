const Joi = require('joi').extend(require('@joi/date'));

const filterRequest = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').required(),
    endDate: Joi.date().format('YYYY-MM-DD').greater(Joi.ref('startDate')).required(),
    minCount: Joi.number().positive().integer().required(),
    maxCount: Joi.number().positive().integer().greater(Joi.ref('minCount')).required()
});

export {filterRequest}
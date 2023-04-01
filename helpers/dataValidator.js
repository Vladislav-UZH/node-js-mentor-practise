const Joi = require("joi");

const dataValidator = (data) => {
  const schema = Joi.object({
    filename: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(data);
};
module.exports = dataValidator;

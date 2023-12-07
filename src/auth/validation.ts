import Joi from "joi";

export const taskCreation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

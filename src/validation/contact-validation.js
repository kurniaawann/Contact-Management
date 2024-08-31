import Joi from "joi";

const createContactValidation = Joi.object({
  frist_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).optional(),
  phone: Joi.string().max(20).optional(),
});

const getContactValidation = Joi.number().positive().required();
const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  frist_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).optional(),
  phone: Joi.string().max(20).optional(),
});

const searchhContactValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(20).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export {
  createContactValidation,
  getContactValidation,
  searchhContactValidation,
  updateContactValidation,
};

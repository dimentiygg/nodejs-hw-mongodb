import Joi from 'joi';
import { typeList } from '../constants/constants.js';

const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeList)
    .required(),
  photo: Joi.string(),
});

export default createContactsSchema;

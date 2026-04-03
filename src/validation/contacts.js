import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

/* const { ObjectId } = require('mongodb'); */

// Middleware для перевірки валідності ObjectId
/* const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }
  next();
}; */

// Схема для POST /contacts (обов’язкові поля: name, phoneNumber, contactType)
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be at most 20 characters long',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be at most 20 characters long',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of [work, home, personal]',
      'any.required': 'Contact type is required',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

// Схема для PATCH /contacts/:contactId (усі поля необов’язкові)
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be at most 20 characters long',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be at most 20 characters long',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of [work, home, personal]',
  }),
}).min(1); // Потрібно хоча б одне поле для оновлення

/* module.exports = {
  isValidId,
  createContactSchema,
  updateContactSchema,
};
 */

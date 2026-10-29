import Joi from "joi";

/**
  Creates a validation function for theJoi schema.
  Returns the validation result, collecting errors.
 */

const validate = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

// Registration data
const signupSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(8).required(),
  location: Joi.string().trim().allow(""),
  description: Joi.string().trim().allow(""),
  occupation: Joi.string().trim().allow(""),
}).required();

// Login data
const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
}).required();

// Photo upload form data
const photoSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow("").default(""),
}).required();

// New comment data
const commentSchema = Joi.object({
  comment: Joi.string().trim().required(),
}).required();

// Route parameters, such as /api/photos/:id
const idParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
}).required();

// Export a separate validation function for each purpose
export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);
export const validatePhoto = validate(photoSchema);
export const validateComment = validate(commentSchema);
export const validateIdParams = validate(idParamsSchema);

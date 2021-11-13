import joi from 'joi';

const signUpSchema = joi.object({
  name: joi.string().min(3).max(255).required(),
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
});

export default signUpSchema;

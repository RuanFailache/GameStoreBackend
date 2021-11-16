import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().email(),
  password: joi.string().min(6),
});

export default signInSchema;

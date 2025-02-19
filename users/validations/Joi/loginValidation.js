const Joi = require("joi");

const loginValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)
      .message('"email" must be a valid email')
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{6,}$/)
      .message(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character: '!@#$%^&*-'."
      )
      .required(),
  });

  return schema.validate(user);
};

module.exports = loginValidation;

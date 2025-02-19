const Joi = require("joi");

const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().trim().min(2).max(256).required(),
      middle: Joi.string().trim().min(2).max(256).allow("").default(""),
      last: Joi.string().trim().min(2).max(256).required(),
    }).required(),
    isBusiness: Joi.boolean().required(),
    phone: Joi.string()
      .trim()
      .pattern(/^0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}$/)
      .message("Valid phone format: 0xxxxxxxxx or 0xx-xxxxxxx or 0xx-xxx-xxxx")
      .required(),
    email: Joi.string()
      .trim()
      .lowercase()
      .pattern(/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,5})$/)
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
    image: Joi.object({
      url: Joi.string().trim().uri().allow("").default(""),
      alt: Joi.string().trim().min(2).max(256).allow("").default("No description"),
    }).required(),
    address: Joi.object({
      state: Joi.string().trim().min(2).max(256).allow(""),
      country: Joi.string().trim().min(2).max(256).required(),
      city: Joi.string().trim().min(2).max(256).required(),
      street: Joi.string().trim().min(2).max(256).required(),
      houseNumber: Joi.number().integer().min(1).required(),
      zip: Joi.string()
        .trim()
        .pattern(/^[0-9]{4,}$/)
        .message("Valid zip must have at least 4 digits")
        .allow(""),
    }).required(),
  });

  return schema.validate(user);
};

module.exports = registerValidation;

const loginValidation = require("./Joi/loginValidation");
const registerValidation = require("./Joi/registerValidation");
const editValidation = require("./Joi/editValidation");

module.exports = {
  validateRegistration: registerValidation,
  validateLogin: loginValidation,
  validateUserToEdit: editValidation,
};

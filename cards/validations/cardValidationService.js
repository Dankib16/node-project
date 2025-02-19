const validateCardJoi = require("./Joi/validateCardWithJoi");

const validateCard = (card) => validateCardJoi(card) || null;

module.exports = validateCard;

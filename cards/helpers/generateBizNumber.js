const Card = require("../models/mongodb/Card");
const { handleBadRequest } = require("../../utils/errorHandler");

const generateBizNumber = async () => {
  try {
    let random, card;
    do {
      random = Math.floor(1000000 + Math.random() * 9000000);
      card = await Card.findOne({ bizNumber: random }, { bizNumber: 1, _id: 0 });
    } while (card);
    
    return random;
  } catch (error) {
    return handleBadRequest("GenerateBizNumber", error);
  }
};

module.exports = generateBizNumber;

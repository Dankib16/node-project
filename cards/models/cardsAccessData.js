const { handleBadRequest } = require("../../utils/errorHandler");
const Card = require("./mongodb/Card");
const config = require("config");
const getCards = async () => {
  try {
    return await Card.find();
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const getMyCards = async (userId) => {
  try {
    const cards = await Card.find({ user_id: userId });
    return cards.length ? cards : null;
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const getCard = async (cardId) => {
  try {
    return await Card.findById(cardId) || null;
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const createCard = async (normalizedCard) => {
  try {
    return await new Card(normalizedCard).save();
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const updateCard = async (id, normalizedCard) => {
  try {
    return await Card.findByIdAndUpdate(id, normalizedCard, { new: true }) || null;
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const likeCard = async (cardId, userId) => {
  try {
    const card = await Card.findById(cardId);
    if (!card) return null;

    const isLiked = card.likes.includes(userId);
    card.likes = isLiked
      ? card.likes.filter((el) => el !== userId)
      : [...card.likes, userId];

    return await card.save();
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const deleteCard = async (cardId, user) => {
  try {
    const card = await Card.findById(cardId);
    if (!card || (card.user_id.toString() !== user._id && !user.isAdmin)) {
      return null;
    }

    return await Card.findByIdAndDelete(cardId);
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

module.exports = {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
};

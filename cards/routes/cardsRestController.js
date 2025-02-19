const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  getCard,
  getMyCards,
  updateCard,
} = require("../models/cardsAccessData");
const validateCard = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");
const auth = require("../../auth/authService");

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    res.json(cards);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isBusiness) {
      return handleError(res, 403, "Only business users can create cards.");
    }

    const { error } = validateCard(req.body);
    if (error) return handleError(res, 400, error.details[0].message);

    let card = await normalizeCard(req.body, req.user._id);
    card = await createCard(card);
    res.status(201).json(card);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

module.exports = router;

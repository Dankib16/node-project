const mongoose = require("mongoose");
const Image = require("./Image");
const Address = require("./Address");

const cardSchema = new mongoose.Schema({
  title: { type: String, minLength: 2, required: true, trim: true },
  subtitle: { type: String, minLength: 2, required: true, trim: true },
  description: { type: String, minLength: 2, required: true, trim: true },
  phone: { type: String, match: /^0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}$/, required: true, trim: true },
  email: { type: String, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/, required: true, trim: true },
  web: { type: String, match: /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,4})?(\/[a-zA-Z0-9-%@:;.,~#&+_=?]*)?$/, trim: true },
  image: Image,
  address: Address,
  bizNumber: { type: Number, min: 1_000_000, max: 9_999_999, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: false },
  likes: [String],
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;

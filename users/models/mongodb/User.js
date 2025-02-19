const mongoose = require("mongoose");
const Name = require("./Name");
const Image = require("./Image");
const Address = require("./Address");

const userSchema = new mongoose.Schema(
  {
    name: Name,
    phone: {
      type: String,
      minLength: 9,
      trim: true,
      required: true,
      match: /^0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}$/,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
    },
    image: Image,
    address: Address,
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;

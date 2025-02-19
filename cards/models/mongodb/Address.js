const mongoose = require("mongoose");

const Address = new mongoose.Schema({
  state: {
    type: String,
    minLength: 2,
    trim: true,
  },
  country: {
    type: String,
    minLength: 2,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    minLength: 2,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    minLength: 2,
    required: true,
    trim: true,
  },
  houseNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  zip: {
    type: Number,
    default: null,
  },
});

module.exports = Address;

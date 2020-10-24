const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  street_address: {
    type: String,
    required: true,
    index: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;

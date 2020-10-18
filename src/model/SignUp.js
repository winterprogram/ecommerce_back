const mongoose = require("mongoose");
const { Schema } = mongoose;

const signUpSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: {
    type: Object,
    home: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    office: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: Date,
  updated_at: Date,
});

const UserSignup = mongoose.model("UserSignup", signUpSchema);

module.exports = UserSignup;

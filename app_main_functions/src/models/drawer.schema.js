const mongoose = require("mongoose");
const { Schema } = mongoose;

const drawerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  sub_section: {
    type: Boolean,
    required: true,
  },
  sub: {
    type: Array,
    name:
    {
      type: String
    },
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: Date,
  updated_at: Date,
});

const DrawerWidget = mongoose.model("DrawerWidget", drawerSchema);

module.exports = DrawerWidget;

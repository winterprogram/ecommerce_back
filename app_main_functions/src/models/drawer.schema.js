const mongoose = require("mongoose");
const { Schema } = mongoose;

const drawerSchema = new Schema({
  merchantId: {
    type: String,
    required: true,
  },
  list_drawer: [
    {
      name: {
        type: String
      },
      sub_section: {
        type: Boolean
      },
      sub: [
        {
          name: {
            type: String
          }
        }
      ]
    }
  ],
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: Number,
  updated_at: Number,
});

const DrawerWidget = mongoose.model("DrawerWidget", drawerSchema);

module.exports = DrawerWidget;

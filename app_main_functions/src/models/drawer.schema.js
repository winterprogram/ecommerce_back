const mongoose = require("mongoose");
const { Schema } = mongoose;

const drawerSchema = new Schema({
  merchantId: {
    type: String,
    required: true,
  },
  list_drawer: 
  // [
  //   {
  //     name: String,
  //     sub_section: Boolean,
  //     sub: [
  //       {
  //         name: {
  //           type: String
  //         }
  //       }
  //     ]
  //   }
  // ]
  {
    type: Schema.Types.ObjectId,
    ref: "DrawerNameWidget",
  }


  ,
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

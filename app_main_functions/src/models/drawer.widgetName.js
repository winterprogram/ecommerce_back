const mongoose = require("mongoose");
const { Schema } = mongoose;

const drawerNameSchema = new Schema(
    {
        name: {
            type: String
        },
        sub_section: {
            type: Boolean
        },
        // sub: [
        //     {
        //         name: {
        //             type: String
        //         }
        //     }
        // ]
    }

);

const DrawerNameWidget = mongoose.model("DrawerNameWidget", drawerNameSchema);

module.exports = DrawerNameWidget;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const homePageSchema = new Schema({
    merchantId: {
        type: String,
        required: true,
    },
    image_slider: {
        type: Array,
        required: true,
        image_url: String,
        page_route: String
    },
    product_list_section: {
        type: Array,
        products: [{
            type: Schema.Types.ObjectId,
            ref: "ProductSchema",
        }]
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,
    },
    created_at: Number,
    updated_at: Number,
});

const HomePage = mongoose.model("HomePage", homePageSchema);

module.exports = HomePage;

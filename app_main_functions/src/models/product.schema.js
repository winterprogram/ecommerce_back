const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    merchantId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    mrp: {
        type: String,
        required: true,
    },
    selling_price: {
        type: String,
        required: true,
    },
    product_properties: {
        type: Object,
        required:true,
        color:
        {
            type: Array
        },
        sizes:Array,
        images:Array,
        technical_details:{
            type:Object,
            required:true,
            name:String,
            value:String
        },
        additional_details:{
            type:Object,
            required:true,
            name:String,
            value:String
        },
        is_returnable:{
            type:Boolean,
            required:true
        },
        created_at: Number,
        updated_at: Number,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,
    },
    created_at: Number,
    updated_at: Number,
});

const ProductSchema = mongoose.model("ProductSchema", productSchema);

module.exports = ProductSchema;

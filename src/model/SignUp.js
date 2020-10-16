const mongoose = require('mongoose');
const { Schema } = mongoose;

const signUpSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        index: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default:true
    },
    created_at: Date,
    updated_at: Date

});



const UserSignup = mongoose.model('UserSignup', signUpSchema);

module.exports = UserSignup;
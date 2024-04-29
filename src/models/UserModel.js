const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String},
        email: { type: String, required: true, unique: true},
        password: {type: String, required: true },
        phone: { type: Number},
        isAdmin: {type: Boolean, default: false, required: true},
        access_token: {type: String, required: false},
        refresh_token: {type: String, required: false},
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;



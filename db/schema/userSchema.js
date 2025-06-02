const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, trim: true},
    fullName: { type: String, required: true },
    passwordId: { type: String },
    email: { type: String, required: true, unique: true },
    createdOn: {type: Date, required:true},
    otp: {type: String}
});

module.exports = userSchema;
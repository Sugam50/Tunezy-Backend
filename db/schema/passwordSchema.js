const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    _id: { type: String, trim: true},
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    createdOn: {type: Date, required:true}
});

module.exports = passwordSchema;
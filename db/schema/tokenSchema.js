const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _id: { type: String, trim: true},
    userId: { type: String, required: true },
    token: { type: String, required: true },
});

module.exports = tokenSchema;
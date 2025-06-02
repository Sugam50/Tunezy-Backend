const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    _id: { type: String, trim: true},
    mood: {type: String, required: true},
    bannerTitle: { type: String, required: true },
    bannerDescription: { type: String, required: true },
    bannerImage: {type: String, required:true},
    collectionId: {type: String},
    position: {type: Number, default:100},
    createdOn: { type: Date, required:true },
});

module.exports = bannerSchema;
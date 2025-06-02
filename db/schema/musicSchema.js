const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    _id: { type: String, trim: true},
    musicTitle: { type: String, required: true },
    singers: { type: Array, default: [] },
    composers: { type: Array, default: [] },
    lyricists: { type: Array, default: [] },
    posterImage: {type: String, required: true},
    musicUrl: {type: String, required: true },
    lyrics: { type: String },
    playCount: { type: Number, default: 0 },
    createdOn: { type: Date, required:true },
});

module.exports = musicSchema;
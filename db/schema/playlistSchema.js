const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    _id: { type: String, trim: true},
    playlistTitle: { type: String, required: true },
    songs: { type: Array, default: [] },
    assignedTo: { type: Array, default: [] },
    createdBy: {type: String, required: true },
    createdOn: { type: Date, required:true },
});

module.exports = playlistSchema;
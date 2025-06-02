const { generateId } = require('../../utils/generateIds');
const { getModelInstance } = require('./modelFactory');
const playlistsModelName = 'playlists'
const playlistsModel = getModelInstance(playlistsModelName);

module.exports = {

    async createPlaylist(playlistTitle, createdBy, songs) {
        const _id = generateId(playlistsModelName)
        return playlistsModel.create({_id, playlistTitle, createdBy, songs, assignedTo: [createdBy]});
    },

    async getPlaylistsByCreatedBy(createdBy) {
        return playlistsModel.find({createdBy});
    },

    async getPlaylistById(playlistId) {
        return playlistsModel.findOne({playlistId});
    },

    async addSongsToPlaylist(playlistId, songs) {
        return playlistsModel.findOneAndDelete({_id:playlistId}, {$set: {songs:songs}});
    }
}
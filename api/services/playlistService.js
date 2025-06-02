const _ = require('lodash');
const { playlistModel } = require('../../db/models');
const errors = require('../../errors/errors.json');

module.exports.getAllPlayListByCreator = async function getAllPlayListByCreator(req, res) {
    const createdBy  = _.get(req,"query");
    const playlists = await playlistModel.getPlaylistsByCreatedBy(createdBy);
    if(!playlists) {
        return res.status(200).json({...errors.noPlaylistFound, info: []})
    }
    return res.status(200).json({...errors.successRep, info: playlists})
}

module.exports.addSongsToPlaylist = async function addSongsToPlaylist(req, res) {
    const playlistId = _.get(req,"body.playlistId");
    const songs = _.get(req,"body.songs");
    const existingPlaylist = await playlistModel.getPlaylistById(playlistId)
    if(!existingPlaylist) return res.status(200).json({...errors.noPlaylistFound, info: []})
    const existingSongs = _.get(existingPlaylist, "songs");
    existingSongs.push(...songs)
    const playlist = await playlistModel.addSongsToPlaylist(playlistId, existingSongs)

    if(!playlist) return res.status(200).json(errors.failedToAddMusic)
    return res.status(200).json({...errors.successRep, info: playlist})

}

module.exports.createPlaylist = async function createPlaylist(req, res) {
    const playlistTitle = _.get(req,"body.playlistTitle");
    const createdBy = _.get(req,"body.createdBy");
    const songs = _.get(req,"body.songs", []);

    const playlist = await playlistModel.createPlaylist(playlistTitle, createdBy, songs);
    return res.status(200).json({...errors.successRep, info: playlist})
    
}
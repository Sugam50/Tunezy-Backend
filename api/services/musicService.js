
const _ = require('lodash');
const { musicModel } = require('../../db/models');
const errors = require('../../errors/errors.json');


module.exports.getAllMusic = async function getAllMusic(req, res) {
    const { page , pageSize } = req.query;
    const musicDocs = await musicModel.getAllMusics(page, pageSize);
    return res.status(200).json({...errors.successRep, info: musicDocs})
}

module.exports.getMusicById = async function getMusicById(req, res) {
    const { musicId } = req.query;
    const musicDoc = await musicModel.getMusicById(musicId);
    return res.status(200).json({...errors.successRep, info: musicDoc})
}

module.exports.increasePlayCount = async function increasePlayCount(req, res) {
    const { musicId } = req.query;
    const musicDoc = await musicModel.getMusicById(musicId);
    const playCount = _.get(musicDoc, 'playCount') + 1;
    await musicModel.updatePlayCountByMusicId(musicId, playCount);
    return res.status(200).json(errors.successRep)
}

module.exports.addMusic = async function addMusic(req, res) {
    const payload = _.get(req, "body");
    const musicTitle =_.get(payload,"musicTitle");
    const singers =_.get(payload,"singers", []);
    const lyricists =_.get(payload,"lyricists", []);
    const composers =_.get(payload,"composers", []);
    const posterImage =_.get(payload,"posterImage");
    const musicUrl =_.get(payload,"musicUrl");
    const lyrics =_.get(payload,"lyrics", '');
    const playCount =_.get(payload,"playCount", 0);
    try {
        const musicDocs = await musicModel.addMusic(musicTitle, singers, 
            lyricists, composers, posterImage, musicUrl, lyrics, playCount);
        return res.status(200).json({...errors.successRep, info: musicDocs})
    } catch (err) {
        console.log(err);
        return res.status(200).json(errors.failedToInsertMusic)
    }
}

module.exports.searchMusic = async function searchMusic(req, res) {
    const keyword = _.get(req, "query.keyword")
    const page = _.get(req, "query.page", 0)
    const pageSize = _.get(req, "query.pageSize", 10)
    try {
        const musicDocs = await musicModel.searchMusic(keyword, page, pageSize);
        if(musicDocs.length < 1) return res.status(200).json({...errors.noMusicFound, info: []})
        return res.status(200).json({...errors.successRep, info: musicDocs})
    } catch (err) {
        console.log(err);
        return res.status(200).json(errors.failedToFetchMusic)
    }
}
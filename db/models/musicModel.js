const { generateId } = require('../../utils/generateIds');
const { getModelInstance } = require('./modelFactory');
const musicModelName = 'music'
const musicModel = getModelInstance(musicModelName);

module.exports = {

    async addMusic(musicTitle, singers, lyricists, composers, posterImage, musicUrl, lyrics, playCount) {
        const _id = generateId('music')
        return musicModel.create({_id, musicTitle, singers, lyricists, composers, posterImage, musicUrl, lyrics, playCount, createdOn: new Date().toISOString()});
    },

    async getMusicById(musicId) {
        return musicModel.findOne({_id: musicId});
    },
    
    async getAllMusics(page = 0, pageSize = 100) {
        const offset = page * pageSize;
        return musicModel.find({}).limit(pageSize).skip(offset);
    },

    async updatePlayCountByMusicId(musicId, playCount) {
        return musicModel.findOneAndUpdate({_id: musicId}, {$set: {playCount: playCount}});
    },

    async searchMusic(searchValue, page = 0, pageSize = 10) {
        const offset = page * pageSize;
        const query = {
            $or: [
              { musicTitle: { $regex: searchValue, $options: 'i' } },
              { singers: { $elemMatch: { $regex: searchValue, $options: 'i' } } },
              { composers: { $elemMatch: { $regex: searchValue, $options: 'i' } } },
              { lyricists: { $elemMatch: { $regex: searchValue, $options: 'i' } } }
            ]
          };
        return musicModel.find(query).limit(pageSize).skip(offset)
    }
}
const { generateId } = require('../../utils/generateIds');
const { getModelInstance } = require('./modelFactory');
const bannerModelName = 'banners'
const bannerModel = getModelInstance(bannerModelName);

module.exports = {

    async addBanner(bannerTitle, mood, bannerDescription, bannerImage, collectionId, position) {
        const _id = generateId(bannerModelName)
        return bannerModel.create({_id,bannerTitle, mood, bannerDescription, bannerImage, collectionId, position, createdOn: new Date().toISOString()});
    },
    async getAllBanners() {
        return bannerModel.find();
    }
}
const _ = require('lodash');
const { bannerModel } = require('../../db/models');
const errors = require('../../errors/errors.json');

module.exports.getAllBanners = async function getAllBanners(req, res) {
    const banners = await bannerModel.getAllBanners();
    return res.status(200).json({...errors.successRep, info: banners})
}

module.exports.createBanner = async function createBanner(req, res) {
    const payload = _.get(req, "body");
    const bannerTitle = _.get(payload,"bannerTitle");
    const mood = _.get(payload,"mood");
    const bannerDescription = _.get(payload,"bannerDescription");
    const bannerImage = _.get(payload,"bannerImage");
    const collectionId = _.get(payload,"collectionId");
    const position = _.get(payload,"position", 100);

    const banner = await bannerModel.addBanner(bannerTitle, mood, bannerDescription, bannerImage, collectionId, position);
    return res.status(200).json({...errors.successRep, info: banner})
}
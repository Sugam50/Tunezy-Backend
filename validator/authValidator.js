const Joi = require('joi');

const emailSignupValidation = {
    body: Joi.object()
    .keys({
        email:Joi.string().required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        fullName: Joi.string().required().min(3),
        password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    }).unknown(false)
}
const emailLoginValidation = {
    body: Joi.object()
    .keys({
        email:Joi.string().required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    }).unknown(false)
}
const forgetPasswordValidation = {
    query: Joi.object()
    .keys({
        email:Joi.string().required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    }).unknown(false)
}
const resetPasswordValidation = {
    body: Joi.object()
    .keys({
        email:Joi.string().required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        otp: Joi.string().required().min(6)
    }).unknown(false)
}

const createMusicValidation = {
    body: Joi.object()
    .keys({
        musicTitle:Joi.string().required(),
        musicUrl: Joi.string().required(),
        posterImage: Joi.string().required(),
    }).unknown(true)
}

const createPlaylistValidation = {
    body: Joi.object()
    .keys({
        playlistTitle:Joi.string().required(),
        createdBy: Joi.string().required(),
    }).unknown(true)
}

const addSongPlaylistValidation = {
    body: Joi.object()
    .keys({
        playlistId:Joi.string().required(),
        songs: Joi.array().required(),
    }).unknown(false)
}
const createBannerValidation = {
    body: Joi.object()
    .keys({
        bannerTitle: Joi.string().required(),
        mood: Joi.string().required(),
        bannerDescription: Joi.string().required(),
        bannerImage: Joi.string().required(),
        collectionId: Joi.string().required(),
    }).unknown(true)
}

module.exports = {
    emailSignupValidation,
    emailLoginValidation,
    forgetPasswordValidation,
    resetPasswordValidation,
    createMusicValidation,
    createPlaylistValidation,
    addSongPlaylistValidation,
    createBannerValidation
}
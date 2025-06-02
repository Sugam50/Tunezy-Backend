const bannerSchema = require('./bannerSchema');
const musicSchema = require('./musicSchema');
const passwordSchema = require('./passwordSchema');
const playlistSchema = require('./playlistSchema');
const tokenSchema = require('./tokenSchema');
const userSchema = require('./userSchema');

module.exports = {
    users: userSchema,
    tokens: tokenSchema,
    password: passwordSchema,
    music: musicSchema,
    playlists: playlistSchema,
    banners: bannerSchema
};
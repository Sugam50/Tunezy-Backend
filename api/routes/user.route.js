require('dotenv').config();
const express = require('express');
const router = express.Router();
const LoginService = require('../services/loginService');
const MusicService = require('../services/musicService');
const validate = require('../../middlewares/validate');
const authValidator = require('../../validator/authValidator');
const authMiddleware = require('../../middlewares/authMiddleware');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const userModel = require('../../db/models/userModel');
const config = require("../config/config.json");
const PlaylistService = require('../services/playlistService');
const BannerService = require('../services/bannerService');


const callbackURL = process.env.CALLBACK_URL;

console.log("callbackURL:", callbackURL)

// Configure session middleware
router.use(session({
    secret: process.env.gcpClientSecret,
    resave: false,
    saveUninitialized: true,
  }));
  
// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.gcpClientId,
    clientSecret: process.env.gcpClientSecret,
    callbackURL: callbackURL,
  },LoginService.googleLogin));
  
  // Serialize user into the sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user from the sessions
  passport.deserializeUser((id, done) => {
    userModel.getUserDetailByUserId(id, (err, user) => {
      done(err, user);
    });
  });
  
// Route to trigger OAuth login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
// OAuth callback URL
router.get('/auth/google/callback', passport.authenticate('google'),(req, res) => {
  res.redirect('tunezy://auth');
});
// router.get('/auth/google/callback', passport.authenticate('google'), LoginService.getUserProfileForGoogleUser);

router.use(authMiddleware)

router.get('/myprofile', LoginService.getProfile);

router.post('/signUp', validate(authValidator.emailSignupValidation), LoginService.signUp);
router.post('/login', validate(authValidator.emailLoginValidation), LoginService.login);
router.post('/forgetPassword', validate(authValidator.forgetPasswordValidation), LoginService.forgetPassword);
router.post('/resetPassword', validate(authValidator.resetPasswordValidation), LoginService.resetPassword);

//MUSIC
router.post('/playCount', MusicService.increasePlayCount);
router.post('/addMusic', validate(authValidator.createMusicValidation), MusicService.addMusic);

//Playlist
router.post('/addPlaylist', validate(authValidator.createPlaylistValidation), PlaylistService.createPlaylist);
router.post('/addSongs', validate(authValidator.addSongPlaylistValidation), PlaylistService.addSongsToPlaylist);

//Banner
router.post('/createBanner', validate(authValidator.createBannerValidation), BannerService.createBanner);

router.get('/allBanners', BannerService.getAllBanners);

router.get('/allPlaylist', PlaylistService.getAllPlayListByCreator);
router.get('/allMusic', MusicService.getAllMusic);
router.get('/search', MusicService.searchMusic);
router.get('/musicDetail', MusicService.getMusicById);

module.exports = router;
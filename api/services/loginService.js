
const _ = require('lodash');
const { userModels, tokenModels, passwordModel } = require('../../db/models');
const { genRandomString, sha512, signJwtToken } = require('../../utils/commonUtils');
const { createOTPMailConfig, createWelcomeMailConfig } = require('./mailService');
const authJwtConfig = require("../config/authJwtConfig.json")
const errors = require('../../errors/errors.json');

function generateJWTToken(payload) {
    const token = signJwtToken(payload, {}, authJwtConfig)
    return token
}

module.exports.getUserProfileForGoogleUser = async function getUserProfileForGoogleUser(req, res) {
    const userId = _.get(req, "user._id")
    const tokenData = await tokenModels.getTokenByUserId(userId);
    if(tokenData) {
        await tokenModels.deleteTokenByUserId(userId)
    }
    const token = generateJWTToken({userId})
    await tokenModels.createToken(userId, token);
    return res.status(200).json({
        ...errors.successRep,
        info: {
            jwt: token,
        }
    })
}

module.exports.login = async function login(req, res) {
    const payload = _.get(req, 'body');
    const { email, password } = payload;
    const userDoc = await userModels.getUserDetailByEmailId(email);
    if(!userDoc) return res.status(200).json(errors.userNotFoundError);
    const passwordId = _.get(userDoc, "passwordId");
    const passwordDoc = await passwordModel.getPasswordById(passwordId);
    const userPasswordHash = _.get(passwordDoc, "passwordHash");
    const salt = _.get(passwordDoc, "passwordSalt");
    const { passwordHash } = sha512(password, salt);
    const userId = _.get(userDoc, "_id");
    if(userPasswordHash !== passwordHash) {
        return res.status(200).json(errors.invalidPasswordError);
    }
    const tokenData = await tokenModels.getTokenByUserId(userId);
    if(tokenData) {
        await tokenModels.deleteTokenByUserId(userId)
    }
    const token = generateJWTToken({userId})
    await tokenModels.createToken(userId, token);
    return res.status(200).json({
        ...errors.successRep,
        info: {
            jwt: token,
        }
    })
};
module.exports.signUp = async function signUp(req, res) {
    const payload = _.get(req, 'body');
    const { email, fullName, password } = payload;
    const salt = genRandomString(16); //generate password salt
    const { passwordHash, passwordSalt } = sha512(password, salt);
    const userDoc = await userModels.getUserDetailByEmailId(email);
    if(userDoc) {
        return res.status(200).json(errors.userAlreadyExists)
    }
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const { transporter, mailOptions } = await createWelcomeMailConfig(email, fullName, otp);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                return res.status(200).json(errors.invalidEmailAddress)
            }
            console.log('Message sent: %s', info.messageId);
          });
        const passwordDoc = await passwordModel.createPassword(passwordHash,passwordSalt);
        const passwordId = _.get(passwordDoc, '_id');
        const userInfo= await userModels.createUserDoc(email, fullName, passwordId);
        const userId = _.get(userInfo, "_id");
        const token = generateJWTToken({userId})
        await tokenModels.createToken(userId, token);
        return res.status(200).json({
            ...errors.successRep,
            info: {
                jwt: token,
            }
        })
    } catch(err) {
        console.log("~ signUp ~ err:", err);
        return res.status(200).json(errors.serverError)
    }
};

module.exports.forgetPassword = async function forgetPassword(req, res) {
    const { email } =  _.get(req, 'query');
    const userDoc = await userModels.getUserDetailByEmailId(email);
    const userId = _.get(userDoc, "_id");
    const fullName = _.get(userDoc, "fullName");
    if(!userDoc) {
        return res.status(200).json(errors.userNotFoundError)
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const { transporter, mailOptions } = await createOTPMailConfig(email, fullName, otp);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                return res.status(200).json(errors.invalidEmailAddress)
            }
            console.log('Message sent: %s', info.messageId);
        });
        const check = await userModels.updateUserByUserId(userId, {otp: otp});
        return res.status(200).json({ ...errors.successRep, info: {}})
}
module.exports.resetPassword = async function resetPassword(req, res) {
    const payload = _.get(req, 'body');
    const { otp, password, email } = payload;
    const userDoc = await userModels.getUserDetailByEmailId(email);
    const userOtp = _.get(userDoc, "otp");
    const userId = _.get(userDoc, "_id");
    const passwordId = _.get(userDoc, "passwordId");
    if(otp !== userOtp) {
        return res.status(200).json(errors.OTPDoesNotMatch)
    }
    await userModels.deleteUserDataByUserId(userId, {otp});
    const salt = genRandomString(16); //generate password salt
    const { passwordHash, passwordSalt } = sha512(password, salt);
    await passwordModel.updatePasswordByPasswordId(passwordId, passwordHash, passwordSalt);
    const tokenData = await tokenModels.getTokenByUserId(userId);
    if(tokenData) {
        await tokenModels.deleteTokenByUserId(userId)
    }
    const token = generateJWTToken({userId})
    await tokenModels.createToken(userId, token);
    return res.status(200).json({
        ...errors.successRep,
        info: {
            jwt: token,
        }
    })
}

module.exports.getProfile = async function getProfile(req, res) {
    const authInfo = _.get(req, 'authInfo');
    const userId = _.get(authInfo, 'userId');
    const userDoc = await userModels.getUserDetailByUserId(userId);
    if(!userDoc) return res.status(200).json(errors.userNotFoundError);
    
    return res.status(200).json({ ...errors.successRep, info: {userDoc}})
};

module.exports.googleLogin = async function googleLogin(accessToken, refreshToken, profile, done) {
    const emailId = _.get(profile, "emails[0].value");
    try {
      let user = await userModels.getUserDetailByUserId(profile.id);
  
      if (user) {
        done(null, user);
      } else {
        user = await userModels.createUserDocForGmail(profile.id, emailId, profile.displayName)
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  };
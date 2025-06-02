const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const _ = require("lodash");

module.exports.signJwtToken = function signJwtToken(payload, option = {}, authJwtConfig) {
    const options = _.omit(option, ['expiresInMinutes', 'scope']);
    // options.expiresIn = _.get(options, 'expiresIn', authJwtConfig.expiresIn);
    options.algorithm = authJwtConfig.algorithm;
    return jwt.sign(payload, authJwtConfig.privateKey, options);
  };

  module.exports.decodeSuperJWT = function decodeSuperJWT(auth_token, authJwtConfig) {
    return jwt.verify(auth_token, authJwtConfig.publicKey, { algorithms: [authJwtConfig.algorithm] });
  };
module.exports.genRandomString = function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, length); // return required number of characters
  };

module.exports.sha512 = function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
        passwordSalt: salt,
        passwordHash: value,
    };
};
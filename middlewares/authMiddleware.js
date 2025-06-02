const _ = require('lodash');

const ignoreList = require('../api/config/authIgnore.json');
const authJwtConfig = require("../api/config/authJwtConfig.json");
const { decodeSuperJWT } = require('../utils/commonUtils');
const errors = require("../errors/errors.json")
module.exports = function authMiddleware(req, res, next) {
  let token_header; let token_parts; let
    decoded;
  let reqUrl = req.originalUrl.split('?')[0];
  reqUrl = reqUrl.toLowerCase();
  let authP = Promise.resolve();
  if (_.find(ignoreList.equals, (o) => (o) === reqUrl)
            || _.find(ignoreList.startswith, (o) => reqUrl.indexOf(o) === 0)
            || _.find(ignoreList.contains, (o) => reqUrl.indexOf(o) >= 0)) {
    return next();
  }

  token_header = req?.headers?.Authorization || req?.headers?.authorization;
  if (!token_header) {
    return res.status(401).json(errors.missingTokenError);
  }
  token_parts = token_header && token_header.split(' ');
  const token = token_parts[token_parts.length - 1];
  try {
    decoded = decodeSuperJWT(token, authJwtConfig);
  } catch (e) {
    console.info("authMiddleware ~ e:", e)
    return res.status(401).json(errors.invalidTokenError);
  }
  authP = Promise.resolve(decoded);

  return authP.then((authInfo) => {
    if (!authInfo) Promise.reject();
    req.headers["x-identity"] = authInfo.email || authInfo.phoneNo; // added for monitoring
    req.headers["x-uid"] = authInfo.userId; // added for monitoring
    req.authInfo = authInfo;
    req.isSuper = true;
    req.authInfo.userId = authInfo.userId;
    req.authInfo.tokenId = decoded.tokenId;
    req.headers.authorization = decoded.tokenId;// just log tokenId instead of whole token
    next();
  }).catch((err) => {
    console.log(err, req, res);
  });
};

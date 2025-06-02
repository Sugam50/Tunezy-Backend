const uuidv4 = require('uuid').v4;

function createID(idprefix) {
  return `${idprefix}-${uuidv4()}`;
}

function IDGeneratorFactory(_prefix) {
  return createID(_prefix);
}

// modelname : prefix
const idmap = {
    users: "u",
    tokens: "to",
    password: "pwd",
    music: 'mu',
    playlists: 'pl',
    banners: 'ba'
};

exports.generateId = function (modelName) {
  return IDGeneratorFactory(idmap[modelName]);
};

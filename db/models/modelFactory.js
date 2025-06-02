const mongoose = require('mongoose');
const schemas = require('../schema');

function getModelInstance(modelName) {
    if (!schemas[modelName]) {
        throw new Error(`No schema defined for model: ${modelName}`);
    }

    if (!mongoose.models[modelName]) {
        mongoose.model(modelName, schemas[modelName]);
    }

    return mongoose.model(modelName);
}

module.exports = { getModelInstance };

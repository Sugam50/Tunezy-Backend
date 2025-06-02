const { generateId } = require('../../utils/generateIds');
const { getModelInstance } = require('./modelFactory');
const tokenModelName = 'tokens'
const tokenModel = getModelInstance(tokenModelName);

module.exports = {

    async createToken(userId, token) {
        const _id = generateId('tokens')
        return tokenModel.create({_id, userId,token});
    },

    async getTokenByUserId(userId) {
        return tokenModel.findOne({userId});
    },

    async deleteTokenByUserId(userId) {
        return tokenModel.deleteOne({userId});
    }
}
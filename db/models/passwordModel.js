const { generateId } = require('../../utils/generateIds');
const { getModelInstance } = require('./modelFactory');
const passwordModelName = 'password'
const passwordModel = getModelInstance(passwordModelName);

module.exports = {

    async createPassword(passwordHash, passwordSalt) {
        const _id = generateId('password')
        return passwordModel.create({_id, passwordHash, passwordSalt, createdOn: new Date().toISOString()});
    },

    async getPasswordById(passwordId) {
        return passwordModel.findOne({_id: passwordId});
    },

    async updatePasswordByPasswordId(passwordId, passwordHash, passwordSalt) {
        return passwordModel.findOneAndUpdate({_id: passwordId}, {$set: {passwordHash, passwordSalt}});
    }
}
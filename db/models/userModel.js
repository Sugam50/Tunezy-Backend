const { generateId } = require('../../utils/generateIds');
const { getModelInstance } = require('./modelFactory');
const userModelName = 'users'
const userModel = getModelInstance(userModelName);

module.exports = {

    async createUserDoc(emailId, fullName, passwordId) {
        const email = emailId.toLowerCase();
        const _id = generateId('users')
        return userModel.create({_id, email,fullName,passwordId, createdOn: new Date().toISOString()});
    },

    async createUserDocForGmail(id, emailId, fullName) {
        const email = emailId.toLowerCase();
        return userModel.create({_id: id, email,fullName, createdOn: new Date().toISOString()});
    },

    async updateUserByUserId(userId, payload) {
        return userModel.findOneAndUpdate({_id:userId}, {$set: payload});
    },

    async deleteUserDataByUserId(userId, payload) {
        return userModel.findOneAndUpdate({_id:userId}, {$unset: payload});
    },
    
    async getUserDetailByEmailId(emailId) {
        const email = emailId.toLowerCase();
        return userModel.findOne({email});
    },

    async getUserDetailByUserId(userId) {
        return userModel.findOne({_id:userId});
    }
}
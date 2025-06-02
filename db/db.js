const dbConfig = require('./config/db.json').db
const mongoose = require('mongoose');

async function connectDB() {
    // const uri = `mongodb://${dbConfig.uri}:${dbConfig.port}/${dbConfig.database}`;
    const uri = `mongodb+srv://Sugam50:Sugam123@assignment1.iha6em8.mongodb.net/tunezy?retryWrites=true&w=majority&appName=Assignment1`;
    try {
        console.log('Initializing DB');
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}
module.exports = connectDB;
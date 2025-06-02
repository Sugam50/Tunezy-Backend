const express = require('express');
const app = express();
const cors = require("cors");
const userRoute = require('./api/routes/user.route');
const connectDB = require('./db/db');

const port = 3500;
const init = async () => {
    app.use(express.json())
    app.use(cors()); 
    app.use('/api/user', userRoute);
   
    await connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);  
        });
    }).catch(err => {
        console.log(err);
    })
}

init()
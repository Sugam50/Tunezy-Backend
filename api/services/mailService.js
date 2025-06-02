const authJwtConfig = require("../config/authJwtConfig.json")
const authConfig = require("../config/config.json")
const errors = require('../../errors/errors.json');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
let otpDataFile;
let welcomeDataFile;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: authConfig.emailUser,
        pass: authConfig.password
    }
});
fs.readFile(path.join(__dirname, "../../template/otpMailTemplate.html"), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    otpDataFile = data
}); 
fs.readFile(path.join(__dirname, "../../template/welcomeMailTemplate.html"), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    welcomeDataFile = data
}); 
async function createOTPMailConfig(email, user, otpCode) {
    // Replace placeholders with dynamic values in the HTML template
    const dynamicMailTemplate = otpDataFile.replace("[User]", user).replace("[OTP_CODE]", otpCode);    
  
    let mailOptions = {
        from: `"Tunezy" <${authConfig.emailUser}>`,
        to: email,
        subject: 'Tunezy! OTP to verify you Account',
        html: dynamicMailTemplate,
    };
    return {
        transporter,
        mailOptions
    }
}
async function createWelcomeMailConfig(email, user) {
    
    const dynamicMailTemplate = welcomeDataFile.replace("[User]", user);    

    let mailOptions = {
        from: `"Tunezy" <${authConfig.emailUser}>`,
        to: email,
        subject: 'Hey!! Welcome to Tunezy!',
        html: dynamicMailTemplate,
    };
    return {
        transporter,
        mailOptions
    }
}

module.exports= {
    createOTPMailConfig,
    createWelcomeMailConfig,
}
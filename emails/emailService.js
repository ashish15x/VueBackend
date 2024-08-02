const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "ashishkumarhsc@gmail.com",
        pass: "huwl qsub mhdu beec"
    }
});

const otps = {}; 

function sendEmail(email, otp) {
    const receiver = {
        from: "ashishkumarhsc@gmail.com",
        to: email, 
        subject: "Your OTP to login",
        text: `Your OTP code is ${otp}`,
        html: `
            <p>Your OTP code is <strong>${otp}</strong></p>
            <img src="https://jkzftrnjctfeqvijnfkf.supabase.co/storage/v1/object/public/images/hsc.jpg" alt="Logo" style="width: 100px; height: auto; float: left; margin-right: 10px;" />
        `
    };

    transporter.sendMail(receiver, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

module.exports = {sendEmail, otps };

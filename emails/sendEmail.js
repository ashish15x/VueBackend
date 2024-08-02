
const nodemailer = require("nodemailer");

const sendMail = async(req,res)=>{
    let testAccount = await nodemailer.createTestAccount();

    //connects with smtp
    let transporter =  await nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port: 587,
        auth:{
            user:	"santa36@ethereal.email",
            pass:	"KcBUYWUX1Dwcstzp8A"
        }
    });

    let info = await transporter.sendMail({
        from:'"Ashish Kumar" <santa36@ethereal.email>',
        to: "ashish15x@gmail.com",
        subject:"Email Subject",
        text:"Hello Ashish",
        html:"<b>Hello from Node JS</b>"
    });

    console.log("Message sent: %s",info.messageId);
    res.send("I am sending mail");
};

module.exports = sendMail;
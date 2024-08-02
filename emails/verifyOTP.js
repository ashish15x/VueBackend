const { otps } = require('./emailService');
const { sign } = require('jsonwebtoken');
const { getUserByUserEmail } = require('../users/user.service'); 

function  verifyOTP(req, res) {
    const { email, otp } = req.body;

    if (otps[email] && otps[email] === otp) {
        delete otps[email]; 

        getUserByUserEmail(email, (err, results) => {
            if (err || !results) {
                return res.status(500).json({success: 0,message: "User not found" });
            }

            results.password = undefined;
            const jsontoken = sign({id:results.id, role:results.role, c_id:results.c_id }, "qwerty123", {
                expiresIn: "1h"
            });

            res.json({
                success: 1,
                message: "Login successful",
                token: jsontoken,
                user: results
            });
        });
    } else {
        res.status(400).json({ success: 0, message: "Invalid OTP" });
    }
}

module.exports = { verifyOTP };

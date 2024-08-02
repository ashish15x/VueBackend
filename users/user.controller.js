const {create,getUsers,getUserByUserId,updateUser,deleteUser, getUserByUserEmail,signup,checkEmailExists,getUserByCId} = require("./user.service")
const { hashSync,genSaltSync, compareSync } = require("bcrypt")
const {sign} = require("jsonwebtoken");
const generateOTP = require("../emails/generateOTP")
const { sendEmail,otps } = require('../emails/emailService');

module.exports ={
    createUser:(req,res)=>{
        const body =  req.body;
        const salt= genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },

    getUserByUserId:(req,res)=>{
        const id=req.user.id;
        getUserByUserId(id,(err,results)=>{
            if(err){
             return console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            })
        })
    },

     getUsersHandler :(req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const data = req.body;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        
        updateUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },

    deleteUser:(req,res)=>{
        const id = req.user.id;
        deleteUser(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                messgage:"user deleted sucessfully"
            })
        })
    },

    
    
    login : (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({ success: 0, data: "Error" });
            }
            if (!results) {
                return res.json({ success: 0, data: "Invalid email or password" });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                const otp = generateOTP();
                otps[body.email] = otp;
                sendEmail(body.email, otp);
                
                res.json({
                    success: 1,
                    message: "OTP sent to your email"
                });
            } else {
                return res.json({ success: 0, data: "Invalid email or password" });
            }
        });
    },
    signupUser:(req,res)=>{
        const body =  req.body;
        const salt= genSaltSync(10); 
        body.password=hashSync(body.password,salt);
        signup(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },

    checkEmailExists: (req, res) => {
        const email = req.body.email;

        checkEmailExists(email, (err, exists) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (exists) {
                return res.json({
                    success: 1,
                    message: "Email already exists"
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Email is available"
                });
            }
        });
    },

    getUserByCId: (req,res) =>{
        const id=req.user.c_id;
        getUserByCId(id,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Internal server error"
                })
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:"Record not found"
                })
            }
            return res.json({
                success:1,
                data:results
            })
        })
    }
}

const { create,getCompany,getCompanyById,getPermissionsById,updatePermissions } = require("./company.service");

module.exports = {
  createCompany: (req, res) => {
    const body = req.body;

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  fetchCompany : (req,res) =>{
    getCompany((err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                message:"Internal Server Error"
                        });
        }
        if(!results || results.length===0){
            return res.status(404).json({
                status:0,
                message:"Record not found"
            });
        }
        return res.json({
            success:1,
            data:results
        })
    })
  },

  getCompanyById: (req, res) => {
    const id = req.user.c_id;
    getCompanyById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Internal Server Error"
        });
      }
      if (!results) {
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

  getPermissionsById: (req, res) => {
    const id = req.user.c_id;
    getPermissionsById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Internal Server Error"
        });
      }
      if (!results) {
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
  updatePermissionsHandler: (req, res) => {

    const permissions = req.body.permissions;
    const id = req.user.c_id;

    updatePermissions(id, permissions, (err, results) => {
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

};

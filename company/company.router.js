const {createCompany,fetchCompany,getCompanyById,getPermissionsById,updatePermissionsHandler} = require("./company.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/tokenValidation");



router.post("/",checkToken,createCompany)
// router.get("/allcompanies/",checkToken,fetchCompany)
router.get("/",checkToken,getCompanyById)
router.get("/role",checkToken,getPermissionsById)
router.put("/update",checkToken,updatePermissionsHandler)

module.exports= router;
const { createUser, getUsersHandler, getUserByUserId, updateUser, deleteUser, login, signupUser ,checkEmailExists,getUserByCId} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/tokenValidation");
const authorize = require("../RolesPermissions/authorize");

const { sendOTP } = require("../emails/emailService");

const { getUsers } = require("./user.service");
const {verifyOTP} = require("../emails/verifyOTP")




/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: integer
 *         role:
 *           type: string
 *         exp:
 *           type: integer
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: This API is used to get all users
 *     description: This API is used to get all users
 *     responses:
 *       200:
 *         description: A list of users 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/",checkToken,authorize(getUsers), getUsersHandler);



/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: This API is used to insert data to the database
 *     description: This API is used to insert data
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               role:
 *                 type: string
 *               exp:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added Successfully 
 */
router.post("/", checkToken, authorize('createUser'), createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: This API is used to get a user by ID
 *     description: This API is used to get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to get
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/byid", checkToken, authorize('getUserByUserId'), getUserByUserId);

/**
 * @swagger
 * /users:
 *   patch:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: This API is used to update data in database
 *     description: This API is used to update data
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               role:
 *                 type: string
 *               exp:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated Successfully 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.patch("/", checkToken, authorize('updateUser'), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: This API is used to delete a user by ID
 *     description: This API is used to delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to get
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User Deleted
 */
router.delete("/", checkToken, authorize('deleteUser'), deleteUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: This API is used to login to the database
 *     description: This API is used to login
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successfully
 */
router.post("/login", login);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: This API is used to signup
 *     description: This API is used to insert data
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: SignedUp Successfully 
 */
router.post("/signup",signupUser);

router.post('/verifyotp', verifyOTP);

router.get("/userbycid",checkToken,getUserByCId)

module.exports = router;

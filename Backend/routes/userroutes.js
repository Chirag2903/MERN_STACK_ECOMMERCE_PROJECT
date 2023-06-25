const express = require("express");
const { registeruser, loginuser, logout, forgotpassword,resetpassword, getuserdetails, updatepassword, updateprofile, getalluser, getsingleuser, updateuserrole, deleteuser } = require("../controller/usercontroller");
const { isauthenticateduser, authorizerole } = require("../middleware/auth");
const router = express.Router();

router.route('/register').post(registeruser);

router.route('/login').post(loginuser);

router.route('/password/forgot').post(forgotpassword);

router.route('/password/reset/:token').put(resetpassword);

router.route('/logout').get(logout);

router.route('/me').get(isauthenticateduser, getuserdetails);

router.route('/password/update').put(isauthenticateduser,  updatepassword);

router.route('/me/update').put(isauthenticateduser,  updateprofile);

router.route('/admin/users').get(isauthenticateduser,  authorizerole("admin"),getalluser);

router.route('/admin/user/:id').get(isauthenticateduser,  authorizerole("admin"),getsingleuser).put(isauthenticateduser,  authorizerole("admin"),updateuserrole).delete(isauthenticateduser,  authorizerole("admin"),deleteuser);

module.exports = router;
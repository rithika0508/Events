const express = require("express");
const { resetPassword } = require("../controllers/auth");
const router = express.Router();
const {protect} = require("../middleware/auth");
const { register, login, forgotPassword, updatePassword, logout, getAllUsers } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword/:resetToken").put(resetPassword)
router.route("/updatePassword").post(protect, updatePassword)  //checks if user is logged in or not
router.route("/logout").get(protect, logout)
router.route("/getAllUsers").get(protect, getAllUsers)
module.exports = router;
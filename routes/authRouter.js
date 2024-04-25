const express = require("express");
const { registerUser, signinUser, getUser } = require("../controllers/authController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();
const auth = require("../middlewares/auth")

router.route("/").get(auth,getUser).all(methodNotAllowed);
router.route("/register").post(registerUser).all(methodNotAllowed);
router.route("/signin").post(signinUser).all(methodNotAllowed);

module.exports = router;
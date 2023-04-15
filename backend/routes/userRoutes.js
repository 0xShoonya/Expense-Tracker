const express = require("express");
const router = express.Router();

const {
  signUpUser,
  logInUser,
  logOutUser,
  forgotPassword,
} = require("../controllers/userControllers");

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
router.post("/forgot-password", forgotPassword);

module.exports = router;

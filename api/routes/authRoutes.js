const express = require("express");
const { registerUser, authUser,googleAuthUser, signoutUser } = require("../controllers/authController.js");
const router = express.Router();

router.post("/signup",registerUser);
router.post("/signin",authUser);
router.post("/google/login",googleAuthUser);
router.get("/signout", signoutUser);

module.exports = router;

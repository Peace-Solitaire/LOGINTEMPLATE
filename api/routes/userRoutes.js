const express = require("express");
const {updateUser, deleteUser} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/update/:id",protect,updateUser);
router.delete("/delete/:id", protect, deleteUser);


module.exports = router;

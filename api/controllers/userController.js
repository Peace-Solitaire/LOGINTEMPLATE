const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const { errorHandler } = require("../middleware/errorMiddleware.js");

const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          pic: req.body.pic,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json("deletedUser");
  } catch (error) {
    next(error);
  }
});
const getNotifications = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    // getNotification according to your database structure
    // retur array of notification
  } catch (error) {
    next(error);
  }
});

module.exports = { updateUser, deleteUser, getNotifications };

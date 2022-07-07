const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
//register Post route
router.route("/register").post(registerUser);

//Login route
router.route("/login").post(loginUser);

//forgot password route
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

//Logout route
router.route("/logout").get(logout);

//user detail
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//update password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//update profile pic
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//admin route to get all user
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

//admin route to get Single user and other features
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;

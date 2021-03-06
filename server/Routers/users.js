const verifyToken = require("../middlewares/verifyToken");
const {
  getUserDetails,
  updateUserDetails,
  createFriendRequest,
  updateFriendRequest,
} = require("../controllers/users");

const router = require("express").Router();

router.get("/details/:userid", getUserDetails);
router.put("/update", verifyToken, updateUserDetails);

module.exports = router;

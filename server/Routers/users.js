const verifyToken = require("../middlewares/verifyToken");
const {
  getUserDetails,
  updateUserDetails,
  createFriendRequest,
} = require("../controllers/users");

const router = require("express").Router();

router.get("/details/:userid", getUserDetails);
router.put("/update/:userid", verifyToken, updateUserDetails);

// Friends
router.post("/friendRequest", verifyToken, createFriendRequest);

module.exports = router;

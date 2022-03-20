const verifyToken = require("../middlewares/verifyToken");
const {
  getUserDetails,
  updateUserDetails,
  createFriendRequest,
  updateFriendRequest,
} = require("../controllers/users");

const router = require("express").Router();

router.get("/details/:userid", getUserDetails);
router.put("/update/:userid", verifyToken, updateUserDetails);

// Friends
router.post("/friendRequest", verifyToken, createFriendRequest);
router.put("/friendRequest/:requestID", verifyToken, updateFriendRequest);

module.exports = router;

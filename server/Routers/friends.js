const {
  getAllFriends,
  deleteFriends,
  createFriendRequest,
  updateFriendRequest,
} = require("../controllers/friends");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/friendRequest", verifyToken, createFriendRequest);
router.put("/friendRequest/:requestID", verifyToken, updateFriendRequest);
router.get("/all/:userid", getAllFriends);
router.delete("/delete/:friendshipID", verifyToken, deleteFriends);

module.exports = router;

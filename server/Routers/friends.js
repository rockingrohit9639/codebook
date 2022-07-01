const {
  getAllFriends,
  deleteFriends,
  createFriendRequest,
  acceptFriendRequest,
} = require("../controllers/friends");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/friendRequest", verifyToken, createFriendRequest);
router.post(
  "/friendRequest/accept/:requestID",
  verifyToken,
  acceptFriendRequest
);
router.get("/all/:userid", getAllFriends);
router.delete("/delete/:friendshipID", verifyToken, deleteFriends);

module.exports = router;

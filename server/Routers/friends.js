const { getAllFriends, deleteFriends } = require("../controllers/friends");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.get("/all", verifyToken, getAllFriends);
router.delete("/delete/:friendshipID", verifyToken, deleteFriends);

module.exports = router;
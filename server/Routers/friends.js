const { getAllFriends } = require("../controllers/friends");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.get("/all", verifyToken, getAllFriends);

module.exports = router;
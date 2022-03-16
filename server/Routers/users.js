const verifyToken = require("../middlewares/verifyToken");
const getUserDetails = require("../controllers/users");

const router = require("express").Router();

router.get("/details", verifyToken, getUserDetails);

module.exports = router;
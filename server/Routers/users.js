const verifyToken = require("../middlewares/verifyToken");
const { getUserDetails, updateUserDetails} = require("../controllers/users");

const router = require("express").Router();

router.get("/details/:userid", getUserDetails);
router.put("/update/:userid", verifyToken, updateUserDetails);

module.exports = router;
const { testing } = require("../controllers/users");
const router = require("express").Router();

router.get("/testing", testing);

module.exports = router;
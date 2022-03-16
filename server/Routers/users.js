const { login, register } = require("../controllers/users");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
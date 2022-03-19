const { createPost, getAllPosts } = require("../controllers/posts");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createPost);
router.get("/getAllPosts", verifyToken, getAllPosts);

module.exports = router;
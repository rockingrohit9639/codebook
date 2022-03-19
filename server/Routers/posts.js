const { createPost, getAllPosts, getUserPosts, getPostDetails } = require("../controllers/posts");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createPost);
router.get("/getAllPosts", verifyToken, getAllPosts);
router.get("/getUserPosts", verifyToken, getUserPosts);
router.get("/getPostDetails/:postID", verifyToken, getPostDetails);

module.exports = router;
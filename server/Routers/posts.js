const {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostDetails,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/posts");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createPost);
router.get("/getAllPosts", verifyToken, getAllPosts);
router.get("/getUserPosts", verifyToken, getUserPosts);
router.get("/getPostDetails/:postID", verifyToken, getPostDetails);
router.delete("/deletePost/:postID", verifyToken, deletePost);
router.post("/like/:postID", verifyToken, likePost);
router.post("/comment/:postID", verifyToken, commentPost);
module.exports = router;

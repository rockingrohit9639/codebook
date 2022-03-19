const db = require("../db/connection");
const Posts = db.posts;

const createPost = async (req, res) => {
  if (!req.body.imgURL) {
    return res.status(403).json({ message: "Image URL is required." });
  }
  try {
    const post = await Posts.create({
      postTitle: req.body.postTitle !== undefined ? req.body.postTitle : null,
      // codeSnippet: req.body.codeSnippet || "console.log('No code snippet')",
      imgURL: req.body.imgURL,
      userID: req.userID,
    });

    if (!post) {
      return res.status(401).json({ message: "Could not create the post." });
    }

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.findAll();

    return res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Posts.findAll({
      where: {
        userID: req.userID,
      },
    });

    return res.status(200).json(userPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { createPost, getAllPosts, getUserPosts };

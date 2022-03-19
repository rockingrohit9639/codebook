const db = require("../db/connection");
const Posts = db.posts;

const createPost = async (req, res) => {
  if (!req.body.imgURL) {
    return res.status(403).json({ message: "Image URL is required." });
  }
  try {
    const post = await Posts.create({
      postTitle: req.body.title || "Code by Codebook",
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

module.exports = { createPost };

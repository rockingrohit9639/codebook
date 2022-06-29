const db = require("../db/connection");
const Posts = db.posts;
const Likes = db.likes;
const Comments = db.comments;
const Users = db.users;

const createPost = async (req, res) => {
  if (!req.body.imgURL) {
    return res.status(403).json({ message: "Image URL is required." });
  }

  if (!req.body.postTitle) {
    return res.status(403).json({ message: "Post title is required." });
  }
  try {
    let post = await Posts.create({
      postTitle: req.body.postTitle,
      imgURL: req.body.imgURL,
      userID: req.userID,
    });

    if (!post) {
      return res.status(401).json({ message: "Could not create the post." });
    }

    const user = await post.getUser();

    post = { ...post.dataValues, user };

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAllPosts = async (req, res) => {
  try {
    let allPosts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["userID", "username", "photoURL"],
        },
      ],
    });

    allPosts = allPosts.sort(
      (a, b) =>
        Date.parse(new Date(b.createdAt)) - Date.parse(new Date(a.createdAt))
    );

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

const getPostDetails = async (req, res) => {
  try {
    const postDetails = await Posts.findOne({
      where: {
        postID: req.params.postID,
      },
      include: [
        {
          model: Users,
          attributes: ["userID", "username", "photoURL"],
        },
      ],
    });

    if (!postDetails) {
      return res.status(404).json({ message: "Could not find the post." });
    }

    return res.status(200).json(postDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Posts.findOne({
      where: {
        postID: req.params.postID,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Could not find the post." });
    }

    if (post.dataValues.userID === req.userID) {
      await post.destroy();

      return res.status(200).json({ message: "Post deleted successfully." });
    } else {
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this post." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Posts.findOne({
      where: {
        postID: req.params.postID,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const like = await Likes.create({
      userID: req.userID,
      postID: req.params.postID,
    });

    if (!like) {
      return res.status(400).json({ message: "Could not like the post." });
    }

    return res.status(200).json({ message: "Post liked success." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const commentPost = async (req, res) => {
  try {
    const post = await Posts.findOne({
      where: {
        postID: req.params.postID,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (!req.body.body) {
      return res.status(404).json({ message: "Comment body not provided." });
    }

    const comment = await Comments.create({
      body: req.body.body,
      userID: req.userID,
      postID: req.params.postID,
    });

    if (!comment) {
      return res
        .status(400)
        .json({ message: "Could not comment on the post." });
    }

    return res.status(200).json({ message: "Post comment success." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        userID: req.userID,
      },
    });

    const comment = await Comments.findOne({
      where: {
        commentID: req.params.commentID,
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (user.dataValues.userID === comment.dataValues.userID) {
      await comment.destroy();
      return res.status(200).json({ message: "Comment delete success." });
    } else {
      return res.status(403).json({ message: "You are not authorized." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getComments = async (req, res) => {
  if (!req.params.postID) {
    return res.status(400).json({ message: "postID not provided!" });
  }
  try {
    const comments = await Comments.findAll({
      where: {
        postID: req.params.postID,
      },
      include: [
        {
          model: Users,
          attributes: ["userID", "username", "photoURL"],
        },
      ],
    });

    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getLikes = async (req, res) => {
  try {
    const allLikes = await Likes.findAll({
      include: [
        {
          model: Users,
          attributes: ["userID", "username", "photoURL"],
        },
      ],
    });

    return res.status(200).json(allLikes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostDetails,
  deletePost,
  likePost,
  commentPost,
  deleteComment,
  getComments,
  getLikes,
};

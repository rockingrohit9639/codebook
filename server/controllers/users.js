const db = require("../db/connection");
const Users = db.users;
const Posts = db.posts;

const testing = async (req, res) => {
  try {
    const user = await Users.findOne({where: {userID: 1}});
    const posts = await user.getPosts();

    return res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { testing };

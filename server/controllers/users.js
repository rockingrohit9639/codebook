const db = require("../db/connection");
const Users = db.users;
const Posts = db.posts;
const Friendships = db.friendships;

const testing = async (req, res) => {
  try {
    // const friends = await Friendships.findAll({
    //     where: {
    //         status: 1,
    //     }
    // });

    return res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { testing };

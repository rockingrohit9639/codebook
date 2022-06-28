const { Op } = require("sequelize");
const db = require("../db/connection");
const Users = db.users;
const Friends = db.friendships;
const Posts = db.posts;

const getUserDetails = async (req, res) => {
  try {
    const userID = req.params.userid;
    const userDetails = await Users.findOne({
      where: {
        userID: userID,
      },
    });

    const allFriends = await Friends.findAll({
      where: {
        [Op.or]: [
          { senderID: req.params.userid },
          { receiverID: req.params.userid },
        ],
        status: 1,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Users,
          as: "receiver",
          attributes: ["userID", "username", "photoURL"],
        },
        {
          model: Users,
          as: "sender",
          attributes: ["userID", "username", "photoURL"],
        },
      ],
    });

    const friends = [];
    for (let fr of allFriends) {
      if (fr.dataValues.receiver.dataValues.userID == req.params.userid) {
        friends.push(fr.dataValues.sender.dataValues);
      } else {
        friends.push(fr.dataValues.receiver.dataValues);
      }
    }

    const userPosts = await Posts.findAll({
      where: {
        userID: req.params.userid,
      },
    });

    if (!userDetails) {
      return res.status(404).json({ message: "Could not find the user." });
    }

    const { password, ...others } = userDetails.dataValues;

    const userData = {
      ...others,
      friends,
      posts: userPosts,
    };

    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const updated = await Users.update(
      {
        ...req.body,
      },
      { where: { userID: req.userID } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Could not update the user." });
    }

    return res
      .status(200)
      .json({ message: "Your details updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  getUserDetails,
  updateUserDetails,
};

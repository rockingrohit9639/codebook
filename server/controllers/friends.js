const { json } = require("body-parser");
const { Op } = require("sequelize");
const db = require("../db/connection");
const Friends = db.friendships;
const Users = db.users;

const getAllFriends = async (req, res) => {
  try {
    const allFriends = await Friends.findAll({
      where: {
        [Op.or]: [{ senderID: req.userID }, { receiverID: req.userID }],
        status: 1,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Users,
          as: "receiver",
        },
        {
          model: Users,
          as: "sender",
        },
      ],
    });

    return res.json(allFriends);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const deleteFriends = async (req, res) => {
  if (!req.params.friendshipID) {
    return res.status(400).json({ message: "friendshipID not provided!" });
  }
  try {
    const friend = await Friends.findOne({
      where: {
        friendshipID: req.params.friendshipID,
      },
    });

    if (!friend) {
      return res.status(400).json({ message: "Could not find friendship!" });
    }

    await friend.destroy();
    return res.statu(200).json({ message: "Friendship Deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { getAllFriends, deleteFriends };

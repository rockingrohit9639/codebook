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
          as: "receiver"
        },
        {
          model: Users,
          as: "sender"
        }
      ]
    });

    return res.json(allFriends);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { getAllFriends };

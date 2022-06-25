const { json } = require("body-parser");
const { Op } = require("sequelize");
const db = require("../db/connection");
const Friends = db.friendships;
const Users = db.users;

// Friends
const createFriendRequest = async (req, res) => {
  var status = req.body.status;

  if (!req.body.receiverID) {
    return res.status(404).json({ message: "Receiver not found." });
  }

  if (!status) {
    status = 0;
  }

  if (req.userID == req.body.receiverID) {
    return res
      .status(400)
      .json({ message: "Receiver and sender cannot be same." });
  }

  try {
    const receiver = await Users.findOne({
      where: {
        userID: req.body.receiverID,
      },
    });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    const request = await Friendships.create({
      status: status,
      senderID: req.userID,
      receiverID: req.body.receiverID,
    });

    if (!request) {
      return res.status(403).json({ message: "Could not send the request." });
    }

    return res.status(200).json({ message: "Request sent successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const updateFriendRequest = async (req, res) => {
  if (!req.body.status) {
    return res.status(400).json({ message: "Status not provided." });
  }
  try {
    const request = await Friendships.findOne({
      where: {
        friendshipID: req.params.requestID,
      },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    request.status = req.body.status;
    await request.save();

    return res.status(200).json({ message: "Request updated success." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getAllFriends = async (req, res) => {
  try {
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

    return res.status(200).json(friends);
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

module.exports = {
  createFriendRequest,
  updateFriendRequest,
  getAllFriends,
  deleteFriends,
};

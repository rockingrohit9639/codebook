const { json } = require("body-parser");
const { Op } = require("sequelize");
const db = require("../db/connection");
const Friends = db.friendships;
const Users = db.users;

// Friends
const createFriendRequest = async (req, res) => {
  let status = req.body.status;

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

    const request = await Friends.create({
      status: status,
      senderID: req.userID,
      receiverID: req.body.receiverID,
    });

    if (!request) {
      return res.status(403).json({ message: "Could not send the request." });
    }

    const data = { ...request.dataValues, type: "sender" };

    return res
      .status(200)
      .json({ message: "Request sent successfully.", body: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const request = await Friends.findOne({
      where: {
        friendshipID: req.params.requestID,
      },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (req.userID === request.dataValues.receiverID) {
      request.status = 1;
      await request.save();
    } else {
      return res.status(400).json({ message: "You are not the receiver!" });
    }

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
        [Op.or]: [{ status: 1 }, { status: 0 }],
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
        const newFriend = {
          ...fr.dataValues.sender.dataValues,
          status: fr.dataValues.status,
          friendshipID: fr.dataValues.friendshipID,
          type: "sender",
        };
        friends.push(newFriend);
      } else {
        const newFriend = {
          ...fr.dataValues.receiver.dataValues,
          status: fr.dataValues.status,
          friendshipID: fr.dataValues.friendshipID,
          type: "reciever",
        };
        friends.push(newFriend);
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
    return res.status(200).json({ message: "Friendship Deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  createFriendRequest,
  acceptFriendRequest,
  getAllFriends,
  deleteFriends,
};

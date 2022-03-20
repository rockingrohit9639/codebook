const db = require("../db/connection");
const Users = db.users;
const Friendships = db.friendships;

const getUserDetails = async (req, res) => {
  try {
    const userID = req.params.userid;
    const userDetails = await Users.findOne({
      where: {
        userID: userID,
      },
    });

    if (!userDetails) {
      return res.status(404).json({ message: "Could not find the user." });
    }

    const { password, ...others } = userDetails.dataValues;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const updated = await Users.update(
      {
        ...req.body,
      },
      { where: { userID: req.params.userid } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Could not update the user." });
    }

    return res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Friends
const createFriendRequest = async (req, res) => {
  var status = req.body.status;

  if (!req.body.receiverID) {
    return res.status(404).json({ message: "Receiver not found." });
  }

  if (!status) {
    status = 0;
  }
  
  if(req.userID == req.body.receiverID){
    return res.status(400).json({ message: "Receiver and sender cannot be same." }); 
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

module.exports = { getUserDetails, updateUserDetails, createFriendRequest };

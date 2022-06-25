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
      { where: { userID: req.userID } }
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

module.exports = {
  getUserDetails,
  updateUserDetails,
};

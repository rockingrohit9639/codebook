const db = require("../db/connection");
const Users = db.users;

const getUserDetails = async (req, res) => {
    try {
        const userID = req.params.userid;
        const userDetails = await Users.findOne({
            where: {
                userID: userID
            }
        })

        if(!userDetails){
            return res.status(404).json({ message: "Could not find the user." })
        }

        const { password, ...others } = userDetails.dataValues;

        return res.status(200).json(others)
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error!"})
    }
}

module.exports = getUserDetails;
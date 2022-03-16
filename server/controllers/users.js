
const getUserDetails = (req, res) => {
    
    console.log("user id is : ", req.userID)
    return res.send("OK")
}

module.exports = getUserDetails;
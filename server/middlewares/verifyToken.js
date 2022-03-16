const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err){
                return res.status(403).json({ message: "Invalid Token" });
            }
            req.userID = user.userID;
            next();
        })
    }
    else {
        return res.status(401).json({ message: "You are not authenticated." });
    }
};

module.exports = verifyToken;
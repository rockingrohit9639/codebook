const db = require("../db/connection");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Users = db.users;
const Posts = db.posts;
const Friendships = db.friendships;

const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const gender = req.body.gender;
  const password = req.body.password;
  const DOB = req.body.DOB;

  try {
    const newUser = await Users.create({
      username,
      email,
      gender,
      DOB,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.CRYPTO_SECRET_KEY
      ).toString(),
    });

    if (newUser) {
      return res.status(201).json({ message: "Registration success." });
    }
  } catch (e) {
    console.log(e);
    if (e.errors) {
      return res.status(401).json({ message: e.errors[0].original });
    } else {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.body.username },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exists!" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET_KEY
    );
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (req.body.password !== decryptedPassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const accessToken = jwt.sign(
      {
        userID: user.userID,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user.dataValues;

    return res.status(200).json({ accessToken, ...others})

  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, register };

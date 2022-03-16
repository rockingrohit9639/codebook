const db = require("../db/connection");
const CryptoJS = require("crypto-js");
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
      password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET_KEY).toString(),
    });

    if (newUser) {
      return res.status(201).json({ message: "Registration success." });
    }
  } catch (e) {
      console.log(e)
    const errors = [];
    if (e.errors) {
      e.errors.forEach((err) => {
        errors.push({ message: err.original });
      });
    }

    return res.status(500).json(errors);
  }
};

const login = async (req, res) => {
  try {

    return res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, register };

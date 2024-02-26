const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.getUser = (req, res) => {
  let condition = {};
  condition._id = req.user?.id;
  console.log(req.user?.username);
  User.findOne(condition)
    .select("username")
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getAllUser = (req, res) => {
  User.find()
    .select("username")
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.createUser = async (req, res) => {
  let pass = await bcrypt.hash(req.body.password, 10);
  let user = new User({ ...req.body, password: pass });
  user
    .save()
    .then(() => {
      res.status(201).json({ message: "user created sucessfully" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    });
};

exports.login = (req, res) => {
  User.findOne({ username: req.body.username }).then(async (document) => {
    if (!document) {
      return res.status(500).json({ message: "no such username" });
    } else {
      if (await bcrypt.compare(req.body.password, document.password)) {
        const accessToken = JWT.sign(
          { id: document._id, username: document.username },
          process.env.ACCESS_TOKEN_SECRET
        );

        //set JWT token to cookies
        res.cookie("jwt", accessToken, {
          //httpOnly: true,
          //secure: true,
        });
        console.log("token generated : " + accessToken);
        // Send response
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(500).json({ message: "user not authorized" });
      }
    }
  });
};

exports.logout = (req, res) => {
  // Clear the jwt cookie
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};

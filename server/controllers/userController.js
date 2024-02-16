const bcrypt = require("bcrypt");
const User = require("../model/userModel");

exports.getUsers = (req, res) => {
  const { userId } = req.query;
  let condition = {};
  if (userId) {
    condition._id = userId;
  }
  User.find(condition)
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getUsernames = async (req, res) => {
  try {
    const { userIds } = req.body;
    console.log(userIds);

    const usernames = [];
    for (const userId of userIds) {
      const document = await User.findOne({ _id: userId }, { username: 1 });
      usernames.push(document);
    }

    res.status(200).json({ usernames });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
      res.status(500).json({ "error creatinng user": err });
    });
};

exports.authenticateUser = (req, res) => {
  User.find({ username: req.body.username }).then(async (documents) => {
    if (documents.length === 0) {
      res.status(500).json({ message: "no such username" });
    } else {
      if (await bcrypt.compare(req.body.password, documents[0].password)) {
        res.status(200).json(documents[0]);
      } else {
        res.status(500).json({ message: "user not authorized" });
      }
    }
  });
};

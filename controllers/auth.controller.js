const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res.status(409).json({ message: "User already exists" });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
      });
      res.status(201).send({ message: "User created " + user.login });
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).send({ message: "Login or password are incorrect" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          res.status(200).send({ message: "Login successful" });
          req.session.login = user.login;
          req.session.save();
        } else {
          res.status(400).send({ message: "Login or password are incorrect" });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  if (req.session.login) {
    res.send({ login: req.session.login });
  } else {
    res.status(401).send({ message: "You are not authorized" });
  }
};

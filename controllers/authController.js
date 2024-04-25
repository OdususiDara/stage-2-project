const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Please provide a username" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please provide a password" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return res
      .status(200)
      .json({
        message: "success",
        user: { username: user.username, email: user.email },
        token,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }

  res.json({
    message: "Task Home",
  });
};

const signinUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(400).json({ message: "Please provide a username" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please provide a password" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res
    .status(200)
    .json({
      message: "success",
      user: { username: user.username, email: user.email },
      token,
    });

};

const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  res.json({ user: { username: user.username, email:user.email } });
};

module.exports = { registerUser, signinUser, getUser };
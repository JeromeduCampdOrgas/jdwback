const express = require("express");
const User = require("../models/user");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const jwt = require("jsonwebtoken");

userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findUser(email, password);

    const authToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.status(200).send({ user, authToken });
  } catch (e) {
    res.status(400).send();
  }
};

newUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).send({ user, authToken });
  } catch (e) {
    res.status(400).send(e);
  }
};

getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Aucun utilisateur");
  }
};

getOneUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found!");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

updateUser = async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) return res.status(404).send("User not found!");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndRemove(userId);

    if (!user) return res.status(404).send("User not found!");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  newUser,
  userLogin,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
};

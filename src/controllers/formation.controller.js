const express = require("express");
const Formation = require("../models/formation");
const jwt = require("jsonwebtoken");

newFormation = async (req, res, next) => {
  const formation = new Formation(req.body);
  try {
    const saveFormation = await formation.save();
    res.status(201).send(saveFormation);
  } catch (e) {
    res.status(400).send(e);
  }
};

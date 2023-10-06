const express = require("express");
const router = require("express").Router();
const authentification = require("../middlewares/authentification");
const formationController = require("../controllers/formation.controller");

router.post("/formations", formationController.newFormation);

module.exports = router;

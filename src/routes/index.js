"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");


router.get("/ListView", ctrl.output.ListView);
router.get("/game", ctrl.output.game);
router.get("/ranking", ctrl.output.ranking);

module.exports = router;

  module.exports = router;
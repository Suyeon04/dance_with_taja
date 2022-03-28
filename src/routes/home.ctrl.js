"use strict";

//const User = require("../models/User");

const output ={
ListView : (req, res) => {
    res.render("home/ListView");
  },
  game : (req, res) => {
    res.render("home/game");
  },
  ranking: (req,res)=>{
    res.render("home/ranking");
  }
  };

const process={
//   apply:async (req, res)=>{
//     const user = new User(req.body);
//     const response = await user.apply();
//     return res.json(response);
//   }
};

module.exports = {
  output,
  process,
};
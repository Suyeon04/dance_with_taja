"use strict";

//const User = require("../models/User");

const output ={
home : (req, res) => {
        res.render("ListView");
      },
ListView : (req, res) => {
    res.render("ListView");
  },
  game : (req, res) => {
    res.render("game");
  },
  ranking: (req,res)=>{
    res.render("ranking");
  }
  };


// const process={
// //   apply:async (req, res)=>{
// //     const user = new User(req.body);
// //     const response = await user.apply();
// //     return res.json(response);
// //   }
// };

module.exports = {
  output,
};
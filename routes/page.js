//일반적인 페이지 라우팅 하는 곳
const express = require("express");
const passport = require("passport");
const _ = require("lodash");

let { Bulletin } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  let bulletin;
  const bulletinpost = await Bulletin.findAll()
    .then((result) => {
      bulletin = _.cloneDeep(result);
      // console.log("bulletin ::::" + bulletin + "\n\n");
      console.log("JSON으로 ::::" + JSON.stringify(bulletin));
    })
    .catch((err) => {
      console.log("에러 : ", err);
    });

  res.render("index", {
    user: req.user,
    post: bulletin.reverse(),
  });

  console.log("현재 유저 정보 : \n", req.user);
});

router.get("/boardwrite", (req, res) => {
  let board = req.query.mid;
  let mod = req.query.mod;
  res.render("../views/boardwrite", { user: req.user, board: board, mod: mod });
});

router.get("/boarddelete", (req, res) => {
  let kindofboard = req.query.kindofboard;
  let postid = req.query.postid;
  console.log(kindofboard, "!!!!!test!!!!!", postid);
  res.render("../views/boarddelete", {
    user: req.user,
    kindofboard: kindofboard,
    postid: postid,
  });
});

module.exports = router;

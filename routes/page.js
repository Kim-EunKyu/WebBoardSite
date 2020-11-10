//일반적인 페이지 라우팅 하는 곳
const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

let { Bulletin } = require("../models");

//메인 페이지
router.get("/", async (req, res) => {
  const bulletinpost = await Bulletin.findAll().catch((err) => {
    console.log("에러 : ", err);
  });

  res.render("index", {
    user: req.user,
    post: bulletinpost.reverse(),
  });

  console.log("현재 유저 정보 : \n", req.user);
});

//글작성 페이지
router.get("/boardwrite", async (req, res) => {
  let board = req.query.mid;
  let mod = req.query.mod;
  let postid = req.query.postid;
  let page = req.query.page;

  if (mod) {
    const bulletinpost = await Bulletin.findOne({
      where: {
        id: postid,
      },
    }).catch((err) => {
      console.log("에러 : ", err);
    });
    res.render("../views/boardwrite", {
      user: req.user,
      board: board,
      mod: mod,
      postOne: bulletinpost,
      postid: postid,
      page: page,
    });
  } else {
    res.render("../views/boardwrite", {
      user: req.user,
      board: board,
      mod: mod,
      page: page,
    });
  }
});

//글삭제 페이지
router.get("/boarddelete", (req, res) => {
  let kindofboard = req.query.kindofboard;
  let postid = req.query.postid;
  res.render("../views/boarddelete", {
    user: req.user,
    kindofboard: kindofboard,
    postid: postid,
  });
});

module.exports = router;

//user와 관련한 라우팅을 하는 곳
const express = require("express");
const router = express.Router();

const { User, Bulletin, Comment } = require("../models");

router.get("/login", (req, res) => {
  res.render("../views/login.ejs", {
    user: req.user,
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/createAccount", (req, res) => {
  res.render("../views/createAccount.ejs", {
    user: req.user,
  });
});

router.post("/createUser", async (req, res) => {
  const newUser = await User.findOne({
    where: {
      userid: req.body.createID,
    },
  });
  if (newUser !== undefined) {
    User.create({
      userid: req.body.createID,
      password: req.body.createPW,
    })
      .then((result) => {
        console.log("데이터 추가 완료");
        res.redirect("/");
      })
      .catch((err) => {
        console.log("데이터 추가 실패");
        console.log(err);
        return next(err);
      });
  } else {
    res.redirect("/user/createAccount");
  }
  // const exUser = await User.findOne({ where: { userid } });
});

router.post("/board", (req, res) => {
  console.log("userid: ", req.body.userid);
  console.log("title: ", req.body.title);
  console.log("contents: ", req.body.editor1);
  Bulletin.create({
    userid: req.body.userid,
    title: req.body.title,
    contents: req.body.editor1,
    thumbsup: 0,
    thumbsdown: 0,
  })
    .then((result) => {
      console.log("데이터 추가 완료");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("데이터 추가 실패");
      console.log(err);
      return next(err);
    });
});

router.post("/boardupdate", (req, res) => {
  console.log("업데이트");
});

router.post("/comment", (req, res) => {
  console.log("boardid: ", req.body.boardid);
  console.log("kindofboard: ", req.body.kindofboard);
  console.log("userid: ", req.body.userid);
  Comment.create({
    userid: req.body.userid,
    contents: req.body.comment,
    boardname: req.body.kindofboard,
    boardid: req.body.boardid,
  })
    .then((result) => {
      console.log("데이터 추가 완료");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("데이터 추가 실패");
      console.log(err);
      return next(err);
    });
});

module.exports = router;

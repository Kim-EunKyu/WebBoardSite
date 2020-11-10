//user와 관련한 라우팅을 하는 곳
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User, Bulletin, Comment } = require("../models");

//로그인 화면 라우팅
router.get("/login", (req, res) => {
  res.render("../views/login.ejs", {
    user: req.user,
  });
});

//passport를 통해 로그아웃 수행
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//회원가입 화면 라우팅
router.get("/createAccount", (req, res) => {
  console.log(saltRounds);
  res.render("../views/createAccount.ejs", {
    user: req.user,
  });
});

//기존회원 목록에 없으면 회원가입을 수행
router.post("/createUser", async (req, res) => {
  const newUser = await User.findOne({
    where: {
      userid: req.body.createID,
    },
  });
  if (newUser !== undefined) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.createPW, salt);
    await User.create({
      userid: req.body.createID,
      password: hash,
    })
      .then((result) => {
        console.log("데이터 추가 완료");
        res.redirect("/");
      })
      .catch((err) => {
        console.log("데이터 추가 실패");
        console.log(err);
      });
  } else {
    res.redirect("/user/createAccount");
  }
});

module.exports = router;

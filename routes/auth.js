//인증과 관련한 라우팅을 하는 곳
const express = require("express");
const passport = require("passport");

const router = express.Router();

//passport를 통해서 로그인 인증
router.post(
  "/logincheck",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
  })
);

module.exports = router;

const local = require("./localStrategy");
//const kakao = require("./kakaoStrategy");
const { User } = require("../models");
const passport = require("passport");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("SerializeUser", user);
    done(null, user.userid);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserializeUser", id);
    User.findOne({
      where: { userid: id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
  //kakao(passport);
};

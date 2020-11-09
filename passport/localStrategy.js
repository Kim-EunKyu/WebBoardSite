const LocalStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userid",
        passwordField: "password",
        session: true,
      },
      async (userid, password, done) => {
        console.log("LocalStrategy", userid, password);
        try {
          console.log(userid, password);
          const exUser = await User.findOne({ where: { userid } });
          if (exUser) {
            const result = await (password === exUser.password);
            //bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

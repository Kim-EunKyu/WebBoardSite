//기본적인 모듈 불러오는 곳
const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const session = require("express-session");
const port = 3000;
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const helmet = require("helmet");

//-------------------------
// const http = require("http");
// const https = require("https");
// const fs = require("fs");

// var port1 = 80;
// var port2 = 443;

// const privateKey = fs.readFileSync("./private.pem");
// const certificate = fs.readFileSync("./public.pem");
// const options = {
//   key: privateKey,
//   cert: certificate,
// };
//-------------------------

//env파일에서 환경변수 불러오기
const dotenv = require("dotenv");
dotenv.config();

//필요한 변수들 선언
const { sequelize } = require("./models");

//라우터 변수들
const pageRouter = require("./routes/page");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const fileRouter = require("./routes/file");

//세션 설정
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

//기본적인 보안을 위한 helmet사용
// app.use(helmet());

//passport설정
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportConfig = require("./passport");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

sequelize.sync();
passportConfig(passport);

app.set("view engine", "ejs");
//app.set("views", "./views");
app.use(express.static(path.join(__dirname + "/views")));
// app.use(express.static(path.join(__dirname + "/node_modules")));

app.use(express.urlencoded({ extended: false }));

app.use("/", pageRouter);
app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/file", fileRouter);

app.listen(port, () => {
  console.log(port, "번에서 서버 실행 중...");
});

// http.createServer(app).listen(port1, function () {
//   console.log("Http server listening on port " + port1);
// });

// https.createServer(options, app).listen(port2, function () {
//   console.log("Https server listening on port " + port2);
// });

// const httpsServer = https.createServer(options, app);
// httpsServer.listen(port, function () {
//   console.log("HTTPS server listening on port " + port);
// });

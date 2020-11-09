//게시판에 관련된 라우팅을 하는 곳
const express = require("express");
const passport = require("passport");
const _ = require("lodash");

let { Bulletin, Comment } = require("../models");

const router = express.Router();

router.use("/bulletinboard/:id", async (req, res, next) => {
  let comments;
  let postOne;
  let postList;
  let page = req.query.page;
  console.log(req.params.id);

  await Comment.findAll({
    where: {
      boardname: "bulletin",
      boardid: req.params.id,
    },
  })
    .then((result) => {
      comments = _.cloneDeep(result);
    })
    .catch((err) => {
      console.log("에러 : ", err);
      next(err);
    });

  await Bulletin.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      postOne = _.cloneDeep(result);
      // console.log("Post:", result);
    })
    .catch((err) => {
      console.log("에러 : ", err);
      next(err);
    });

  await Bulletin.findAll()
    .then((result) => {
      postList = _.cloneDeep(result);
      // console.log("Post:", result);
    })
    .catch((err) => {
      console.log("에러 : ", err);
      next(err);
    });

  res.render("boardcontents", {
    user: req.user,
    postOne: postOne,
    post: postList.reverse(),
    comments: comments,
    boardname: "자유 게시판",
    kindofboard: "bulletin",
    boardid: req.params.id,
    page: page,
  });
});

router.get("/boarddelete", (req, res, next) => {
  let kindofboard = req.query.kindofboard;
  let postid = req.query.postid;
  if (kindofboard === "bulletin") {
    Bulletin.destroy({
      where: {
        id: postid,
      },
    })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  }
});

// models.User.destroy({where: {userID: '유저ID'}})
// .then(result => {
//    res.json({});
// })
// .catch(err => {
//    console.error(err);
// });

router.use("/", (req, res) => {
  let kindOfBoard = req.query.mid;
  let page = req.query.page;
  console.log("게시판 종류:", kindOfBoard, "page:", page);
  if (kindOfBoard === null || page === null) {
    res.redirect("/");
  }
  if (kindOfBoard === "bulletin") {
    let bulletinpost = Bulletin.findAll()
      .then((result) => {
        result.reverse();
        res.render("bulletinboard", {
          user: req.user,
          post: result,
          title: "자유 게시판",
          page: page,
        });
      })
      .catch((err) => {
        console.log("에러 : ", err);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;

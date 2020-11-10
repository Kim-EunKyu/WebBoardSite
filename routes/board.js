//게시판에 관련된 라우팅을 하는 곳
const express = require("express");
const passport = require("passport");
const { Bulletin, Comment } = require("../models");
const router = express.Router();

//특정 게시물 라우팅
router.use("/bulletinboard/:id", async (req, res, next) => {
  let page = req.query.page;

  const CommentList = await Comment.findAll({
    where: {
      boardname: "bulletin",
      boardid: req.params.id,
    },
  }).catch((err) => {
    console.log("에러 : ", err);
    next(err);
  });

  const BulletinOne = await Bulletin.findOne({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log("에러 : ", err);
    next(err);
  });

  const BulletinList = await Bulletin.findAll().catch((err) => {
    console.log("에러 : ", err);
    next(err);
  });

  res.render("boardcontents", {
    user: req.user,
    postOne: BulletinOne,
    post: BulletinList.reverse(),
    comments: CommentList,
    boardname: "자유 게시판",
    kindofboard: "bulletin",
    boardid: req.params.id,
    page: page,
  });
});

//게시물 삭제
router.get("/deleteBoard", async (req, res, next) => {
  let kindofboard = req.query.kindofboard;
  let postid = req.query.postid;
  if (kindofboard === "bulletin") {
    await Bulletin.destroy({
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
  } else {
    res.redirect("/");
  }
});

//게시판 글 생성
router.post("/createBoard", async (req, res) => {
  const kindofboard = req.body.board;
  const page = req.body.page;
  const postOne = await Bulletin.create({
    userid: req.body.userid,
    title: req.body.title,
    contents: req.body.editor1,
    thumbsup: 0,
    thumbsdown: 0,
  }).catch((err) => {
    console.log("데이터 추가 실패");
    console.log(err);
  });
  res.redirect(`/board/${kindofboard}board/${postOne.id}?page=${page}`);
});

//게시글 업데이트 수행
router.post("/updateBoard", (req, res) => {
  const kindofboard = req.body.board;
  const postAuthor = req.body.userid;
  const postTitle = req.body.title;
  const postContent = req.body.editor1;
  const postId = req.body.postid;
  const page = req.body.page;
  Bulletin.update(
    { contents: postContent },
    {
      where: {
        id: postId,
      },
    }
  );
  res.redirect(`/board/${kindofboard}board/${postId}?page=${page}`);
});

//댓글 추가 수행
router.post("/comment", async (req, res) => {
  const kindofboard = req.body.kindofboard;
  const postId = req.body.boardid;
  const page = req.body.page;
  if (req.body.comment === "") {
    window.history.back();
  } else {
    await Comment.create({
      userid: req.body.userid,
      contents: req.body.comment,
      boardname: req.body.kindofboard,
      boardid: req.body.boardid,
    }).catch((err) => {
      console.log("데이터 추가 실패");
      console.log(err);
    });
  }
  res.redirect(`/board/${kindofboard}board/${postId}?page=${page}`);
});

//특정 게시판 글 보여주는 곳
router.use("/", async (req, res) => {
  let kindOfBoard = req.query.mid;
  let page = req.query.page;
  if (kindOfBoard === undefined || page === undefined) {
    res.redirect("/");
  }
  if (kindOfBoard === "bulletin") {
    let bulletinpost = await Bulletin.findAll().catch((err) => {
      console.log("에러 : ", err);
    });
    res.render("bulletinboard", {
      user: req.user,
      post: bulletinpost.reverse(),
      title: "자유 게시판",
      page: page,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;

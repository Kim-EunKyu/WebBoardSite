//파일업로드 라우팅 하는 곳
const express = require("express");
const router = express.Router();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

//파일 업로드
router.post("/upload", multipartMiddleware, (req, res) => {
  const orifilepath = req.files.upload.path;
  const orifilename = req.files.upload.name;
  const srvfilename = uuid() + path.extname(orifilename);

  console.log("파일 업로드", orifilepath, orifilename);
  console.log(srvfilename);

  fs.readFile(orifilepath, function (err, data) {
    const newPath = __dirname + "/../views/uploads/" + srvfilename;
    console.log(newPath);
    fs.writeFile(newPath, data, function (err) {
      if (err) console.log({ err: err });
      else {
        html =
          '{"filename" : "' +
          orifilename +
          '", "uploaded" : 1, "url": "/uploads/' +
          srvfilename +
          '"}';
        console.log("html값" + html);
        res.send(html);
      }
    });
  });
});

module.exports = router;

// const cloudinary=require('cloudinary').v2;
// const fs=require('fs')

// cloudinary.config({
//   cloud_name: 'dyxt9lvpu',
//   api_key: '485876539825874',
//   api_secret: 'J6k-E9qlgnRRSeTWiGGY3456gLM'
// });

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.file=uniqueSuffix + file.originalname
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

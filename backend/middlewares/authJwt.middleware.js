const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

// ค่าคงที่หรือคลาสพิมพ์ใหญ่
exports.createPost = async (req, res) => {
  // File upload
  const { path } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  // สร้าง Post
  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover: path,
    author,
  });
  res.json(postDoc);
};

// Middleware สำหรับตรวจสอบ Token
verifyToken = (req, res, next) => {
  const token = req.header("x-access-token"); // รับ token จาก header
  if (!token) {
    return res.status(401).json({ message: "Token is missing" }); 
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) 
      return res.status(403).json({ message: "Access Forbidden" });
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;

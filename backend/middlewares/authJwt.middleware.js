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
const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token"); // รับ token จาก header
  if (!token) {
    return res.status(401).json({ message: "Token is missing" }); // ไม่มี token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Access Forbidden" }); // Token ไม่ถูกต้อง
    }

    // หาก token ถูกต้อง
    req.userId = decoded.id; // เก็บ userId ไว้ใน req
    req.username = decoded.username; // เก็บ username ไว้ใน req
    next(); // ไปยัง middleware หรือ route ถัดไป
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;

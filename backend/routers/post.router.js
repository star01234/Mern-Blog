const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { upload } = require("../middlewares/file.middlewares");
const authJwt = require("../middlewares/authJwt.middleware");
//http://localhost:5000/api/v1/post
router.post("", authJwt.verifyToken, upload, postController.createPost);
router.get("", postController.getPosts);
router.get("/:id",postController.getPostsById);
router.delete("/:id",authJwt.verifyToken, postController.deletePost);
router.put("/:id", authJwt.verifyToken, upload, postController.updatePost);

module.exports = router;
const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createPost = async (req, res) => {
    const {path: cover} = req.file;
    const author = req.userId;
    const {title, summary, content} = req.body

    if(!title || !summary || !content) { 
        return res.status(400).json({message:"All Fields is required"});
    }
    
    const postDoc = await PostModel.create({
        title,
        summary, 
        content, 
        cover,
        author});
    res.json(postDoc);
}

exports.getPosts = async (req, res) => {
    const posts = await PostModel.find()
    .populate("author", ["username"])
    .sort({ createAt: -1 })
    .limit(20)
res.json(posts);
};

exports.getPostsById = async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate ("auther", ["username"]);
    res.json(postDoc);
}

exports.deletePost = async (req, res) => {
    const {id} = req.params;
    const authorId = req.userId;
    try {
        const postDoc = await PostModel.findById(id)
        if(authorId !== postDoc.author.toString()) {
            res.status(403).send({
                message: "You cannot delete this post",
            });
            return;
        }
        await postDoc.deleteOne();
        res.json(postDoc);
    } catch (error) { 
        res.status(500).send({
            message: error.message || "Something error occurred while deleting a post",
        });
    };
}

exports.updatePost = async (req,res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Post id is not provided" });
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      res.status(403).send({
        message: "You cannot update this post",
      });
      return;
    }
    const { path } = req.file
    const {title, summary, content} = req.body;
    if (!title || !summary || !content) {
        return res.status(400).json({ message: "All Fields is required" });
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (req.file) {
        const { path } = req.file;
        postDoc.cover = path;
    }
    await postDoc.save();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while updating a post",
    });
  }
}
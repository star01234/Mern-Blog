const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//http://localhost:5000/api/v1/auth/register
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;

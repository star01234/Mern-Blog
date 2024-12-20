const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all requires fields!",
    });
    return;
  }

  try {
    const hashesPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashesPassword,
    });
    res.send({
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};
// ฟังก์ชันเข้าสู่ระบบผู้ใช้
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (!username || !password) {
    return res.status(400).send({
      message: "Please provide username and password!",
    });
  }

  try {
    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid credentials!",
      });
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "24h" }
    );

    res.status(200).send({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while logging in.",
    });
  }
};

const bcrypt = require("bcrypt");
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

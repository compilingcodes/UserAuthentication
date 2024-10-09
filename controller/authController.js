const { StatusCodes } = require("http-status-codes");

//register

const registerUser = async (req, res) => {
  try {
    res.json({ msg: "Register user" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, msg: err.msg });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    res.json({ msg: "Login" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, msg: err.msg });
  }
};

//logout

const logoutUser = async (req, res) => {
  try {
    res.json({ msg: "Logout" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, msg: err.msg });
  }
};

module.exports = { loginUser, logoutUser, registerUser };

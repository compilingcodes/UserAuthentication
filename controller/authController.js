const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const Auth = require("../model/authModel");
const generateToken = require("../util/token");

//register

const registerUser = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

    //encrypt the password
    let encPass = await bcrypt.hash(password, 10);

    //check user is already registered or not
    let exEmail = await Auth.findOne({ email });
    if (exEmail)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ status: false, msg: `${email} already registered` });

    let exMobile = await Auth.findOne({ mobile });
    if (exMobile)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ status: false, msg: `${mobile} already registered` });

    //save the user info
    let newUser = await Auth.create({ name, email, mobile, password: encPass });

    res.json(StatusCodes.CREATED).json({
      status: true,
      msg: "User Registered Succesfully",
      user: newUser,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, msg: err.msg });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check email exisits or not

    let extUser = await Auth.findOne({ email });
    if (!extUser)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: false, msg: "Requested user not found" });

    //validate if password is correct or not

    let passVal = await bcrypt.compare(password, extUser.password);
    if (!passVal)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: false, msg: `Password are not matched` });

    //auth token
    let token = generateToken(extUser._id);

    //set the token in cookies
    res.cookie("token", token, {
      path: `/`,
      httpOnly: true,
      signed: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    //final response
    res
      .status(StatusCodes.OK)
      .json({ status: true, msg: `Login success`, token });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, msg: err.msg });
  }
};

//logout

const logoutUser = async (req, res) => {
  try {
    //clear the cookie
    res.clearCookie("token", { path: `/` });

    res.status(StatusCodes.OK).json({ status: true, msg: "logout successful" });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, msg: err.msg });
  }
};

//verify token
const verifyUserToken= async(req,res) => {
  try {
    res.json({ msg: "Verify user" })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ status: false, msg: err.msg });
  }
}

module.exports = { loginUser, logoutUser, registerUser , verifyUserToken };

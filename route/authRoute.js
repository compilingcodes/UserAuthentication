const {
  registerUser,
  logoutUser,
  loginUser,
  verifyUserToken
} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

// const express=require('express')
const authRoute = require("express").Router();

//register user
authRoute.post(`/register`, registerUser);

//login user
authRoute.post(`/login`, loginUser);

//register user
authRoute.get(`/logout`, logoutUser);

//register user
authRoute.get(`/verify/usertoken`, authMiddleware ,  verifyUserToken);

module.exports = authRoute;

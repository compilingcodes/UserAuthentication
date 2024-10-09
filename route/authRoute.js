const {
  registerUser,
  logoutUser,
  loginUser,
} = require("../controller/authController");

// const express=require('express')
const authRoute = require("express").Router();

//register user
authRoute.post(`/register`, registerUser);

//login user
authRoute.post(`/login`, loginUser);

//register user
authRoute.get(`/logout`, logoutUser);

module.exports = authRoute;

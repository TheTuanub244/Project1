import axios from "axios";

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export const handleSignIn = async (email, password) => {
  let secret = "qwerty";
  const userInfo = {
    email,
    password,
  };
  const token = jwt.sign(userInfo, secret.toString("utf-8"), {
    algorithm: "HS256",
  });
  return axios.post("http://localhost:8080/api/signIn", { token });
};
export const handleRegister = async (userInfo) => {
  return axios.post("http://localhost:8080/api/handleRegister", { userInfo });
};
export const handleAddReview = async (userId, review, rate, itemId) => {
  return axios.post("http://localhost:8080/api/addReview", {
    userId,
    review,
    rate,
    itemId,
  });
};
export const handleUpdateInfo = async (userId, firstName, lastName, email) => {
  return axios.post("http://localhost:8080/api/updateInfo", {
    userId,
    firstName,
    lastName,
    email,
  });
};
export const handleChangPass = async (userId, password) => {
  return axios.post("http://localhost:8080/api/changePass", {
    userId,
    password,
  });
};

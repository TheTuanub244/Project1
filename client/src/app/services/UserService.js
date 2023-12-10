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

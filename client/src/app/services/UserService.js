import axios from "axios";

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
export const handleSignIn = async (email, password) => {
  let secret = "qwerty";
  const hashPassword = bcrypt.hashSync(password, salt);
  const userInfo = {
    email,
    hashPassword,
  };
  const token = jwt.sign(userInfo, secret.toString("utf-8"), {
    algorithm: "HS256",
  });
  return axios.get("http://localhost:8080/api/signIn", { token });
};

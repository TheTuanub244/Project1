"use client";

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models");
var salt = bcrypt.genSaltSync(10);
const checkSignIn = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let secret = "qwerty";
      let respone;
      const decodeToken = jwt.verify(token, secret.toString("utf-8"));
      if (decodeToken.email && decodeToken.password) {
        const checkEmail = await checkUserEmail(decodeToken.email);
        const checkPassword = await checkUserPassword(decodeToken.password);
        if (checkEmail && checkPassword) {
          const user = await db.User.findOne({
            where: {
              email: decodeToken.email,
              password: decodeToken.password,
            },
            raw: true,
          });
          respone = {
            EC: 0,
            EM: "Đăng nhập thành công!",
            DT: user,
          };
        } else if (!checkPassword && !checkEmail) {
          respone = {
            EC: 3,
            EM2: "Mật khẩu không chính xác!",
            EM1: "Địa chỉ email không hợp lệ!",
          };
        } else if (!checkEmail) {
          respone = {
            EC: 1,
            EM: "Địa chỉ email không hợp lệ!",
          };
        } else if (!checkPassword) {
          respone = {
            EC: 2,
            EM: "Mật khẩu không chính xác!",
          };
        }
      } else if (!decodeToken.email && !decodeToken.password) {
        respone = {
          EC: 3,
          EM2: "Vui lòng nhập mật khẩu!",
          EM1: "Vui lòng nhập địa chỉ email!",
        };
      } else if (!decodeToken.email) {
        respone = {
          EC: 1,
          EM: "Vui lòng nhập địa chỉ email!",
        };
      } else if (!decodeToken.password) {
        respone = {
          EC: 2,
          EM: "Vui lòng nhập mật khẩu!",
        };
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const checkUserEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        respone = true;
      } else {
        respone = false;
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const checkUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone;
      const user = await db.User.findOne({
        where: {
          password: password,
        },
      });
      if (user) {
        respone = true;
      } else {
        respone = false;
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  checkSignIn: checkSignIn,
};

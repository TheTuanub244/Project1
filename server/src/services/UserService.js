"use client";

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models");
const { where } = require("sequelize");
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
const register = async ({
  lastName,
  firstName,
  email,
  password,
  repeatPassword,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone = {
        EC: 0,
        EM1: "",
        EM2: "",
        EM3: "",
        EM4: "",
        EM5: "",

        data: null,
      };
      if (lastName === undefined || lastName == "") {
        respone.EC = 1;
        respone.EM1 = "Vui lòng nhập họ tên!";
      }
      if (firstName === undefined || firstName == "") {
        respone.EC = 2;
        respone.EM2 = "Vui lòng nhập tên!";
      }
      if (email === undefined || email == "") {
        respone.EC = 3;
        respone.EM3 = "Vui lòng nhập địa chỉ emai!";
      }
      if (password === undefined || password == "") {
        respone.EC = 4;
        respone.EM4 = "Vui lòng nhập mật khẩu!";
      }
      if (
        (password !== undefined || password != "") &&
        (repeatPassword === undefined || repeatPassword === "")
      ) {
        respone.EC = 5;
        respone.EM5 = "Vui lòng nhập chính xác mật khẩu!";
      }
      if (respone.EC == 0) {
        const checkEmail = await checkUserEmail(email);
        if (checkEmail) {
          respone.EC = 6;
          respone.EM6 = "Email đã tồn tại!";
        } else {
          const checkPassword = password == repeatPassword ? true : false;
          if (!checkPassword) {
            respone.EC = 7;
            respone.EM7 = "Mật khẩu không chính xác!";
          } else {
            respone.EC = 0;
            respone.EM7 = "";
            await db.User.create({
              lastName,
              firstName,
              email,
              password,
              isAdmin: false,
            });
          }
        }
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
const addReview = async (userId, review, rate, itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Review.create({
        rate: rate,
        description: review,
        ItemId: itemId,
        UserId: userId,
      });
      await calculateReview(itemId, rate);
      const respone = await db.Review.findAll({
        where: {
          itemID: itemId,
        },
        raw: true,
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const calculateReview = async (itemId, rate) => {
  const totalReviews = await db.Review.findAll({
    where: {
      ItemId: itemId,
    },
    raw: true,
  });
  let amount = 0;
  totalReviews?.map((index) => {
    amount += index.rate;
  });
  amount = amount / totalReviews.length;
  let rateToUpdate;
  console.log(amount % 1);
  if (amount % 1 == 0.5) {
    rateToUpdate = amount;
  } else if (amount % 1 > 0.5) {
    rateToUpdate = Math.ceil(amount);
  } else if (amount % 1 < 0.5) {
    rateToUpdate = Math.floor(amount);
  } else {
    rateToUpdate = amount;
  }
  await db.Item.update(
    {
      totalRate: rateToUpdate,
    },
    {
      where: {
        id: itemId,
      },
    }
  );
};
const updateInfo = (userId, firstName, lastName, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      const respone = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const changePass = (userId, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update(
        {
          password: password,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      const respone = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      resolve(null);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  checkSignIn: checkSignIn,
  register: register,
  addReview: addReview,
  updateInfo: updateInfo,
  changePass: changePass,
};

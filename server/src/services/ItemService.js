const db = require("../models/index");

const getAllItem = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone;
      if (id) {
        const item = await db.Item.findOne({
          where: {
            id: id,
          },
          raw: true,
        });
        if (item) {
          respone = {
            EC: 0,
            EM: "Get item sucessfully!",
            DT: item,
          };
        } else {
          respone = {
            EC: 1,
            EM: "Can't find the item!",
          };
        }
      } else {
        const item = await db.Item.findAll({
          raw: true,
        });
        respone = {
          EC: 0,
          EM: "Get all items successfully!",
          DT: item,
        };
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllItem: getAllItem,
};

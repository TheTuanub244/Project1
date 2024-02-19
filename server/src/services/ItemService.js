const { Op } = require("sequelize");
const db = require("../models/index");

const getAllItem = async ({ page, star, category, max, min, search }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone = {};
      if (page && !star && !category && search == "" && !max && !min) {
        const data = await db.Item.findAll({
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({});
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && !star & (search == "") && !max && !min) {
        const data = await db.Item.findAll({
          where: {
            CategoryId: category,
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            CategoryId: category,
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && star && search == "" && !max && !min) {
        const data = await db.Item.findAll({
          where: {
            totalRate: star,
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            totalRate: star,
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && !star && search == "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            oldPrice: {
              [Op.gte]: min,
              [Op.lte]: max,
            },
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            oldPrice: {
              [Op.gte]: min,
              [Op.lte]: max,
            },
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (category && star && search == "" && !max && !min && page) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                CategoryId: category,
              },
              {
                totalRate: star,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                CategoryId: category,
              },
              {
                totalRate: star,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && !star && search == "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                CategoryId: category,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                CategoryId: category,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && star && search == "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                totalRate: star,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                totalRate: star,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && star && search == "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                totalRate: star,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                CategoryId: category,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                totalRate: star,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                CategoryId: category,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && !star && search != "" && !max && !min) {
        const data = await db.Item.findAll({
          where: {
            itemName: {
              [Op.like]: `%${search}%`,
            },
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            itemName: {
              [Op.like]: `%${search}%`,
            },
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && !star && search != "" && !max && !min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                CategoryId: category,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                CategoryId: category,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && star && search != "" && !max && !min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                totalRate: star,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                totalRate: star,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && !star && search != "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && star && search != "" && !max && !min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                CategoryId: category,
              },
              {
                totalRate: star,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                CategoryId: category,
              },
              {
                totalRate: star,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && !category && star && search != "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                totalRate: star,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                totalRate: star,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && !star && search != "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                totalRate: star,
              },
              {
                CategoryId: category,
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                totalRate: star,
              },
              {
                CategoryId: category,
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else if (page && category && star && search != "" && max && min) {
        const data = await db.Item.findAll({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                totalRate: star,
              },
              {
                CategoryId: category,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
          limit: 3,
          offset: (page - 1) * 3,
        });
        const amount = await db.Item.count({
          where: {
            [Op.and]: [
              {
                itemName: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
              {
                totalRate: star,
              },
              {
                CategoryId: category,
              },
              {
                oldPrice: {
                  [Op.gte]: min,
                  [Op.lte]: max,
                },
              },
            ],
          },
        });
        respone = {
          data: data,
          amount: Math.floor(amount / 3) + 1,
        };
      } else {
        const data = await db.Item.findAll({});
        respone = data;
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllReviewsByProduct = async ({ page, id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Review.findAll({
        where: {
          itemID: id,
        },
        include: [db.User],
        limit: 3,
        offset: (page - 1) * 3,
      });
      const amount = await db.Review.count({
        where: {
          itemID: id,
        },
      });
      const respone = {
        data: data,
        amount: Math.floor(amount / 3) + 1,
      };
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const addTransaction = async (transaction) => {
  return new Promise(async (resolve, reject) => {
    try {
      const respone = await db.Transaction.create({
        amount: transaction.amount,
        price: transaction.price,
        paymentMethod: transaction.paymentMethod,
        address: transaction.address,
        itemID: transaction.itemID,
        UserId: transaction.userID,
        transactionStateID: 2,
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const getTransactionByUser = async ({ userID, stateID }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone;
      if (stateID == null) {
        respone = await db.Transaction.findAll({
          where: {
            userID: userID,
          },
          include: [db.TransactionState, db.Item, db.User],
        });
      } else {
        respone = await db.Transaction.findAll({
          where: {
            userID: userID,
            transactionStateID: stateID,
          },
          include: [db.TransactionState, db.Item, db.User],
        });
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllTransaction = async ({ option, search }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let respone;
      if (option && search) {
        switch (parseInt(option)) {
          case 1:
            respone = await db.Transaction.findAll({
              where: {
                id: parseInt(search),
              },
              include: [db.TransactionState, db.Item, db.User],
            });
            break;
          case 2:
            respone = await db.Transaction.findAll({
              include: [
                db.TransactionState,
                {
                  model: db.Item,
                  where: {
                    itemName: {
                      [Op.like]: `%${search}%`,
                    },
                  },
                },
                db.User,
              ],
            });
            break;
          case 3:
            respone = await db.Transaction.findAll({
              include: [db.TransactionState, db.Item, db.User],
              where: {
                amount: parseInt(search),
              },
            });
            break;
          case 4:
            respone = await db.Transaction.findAll({
              include: [
                db.TransactionState,
                {
                  model: db.Item,
                  where: {
                    brand: {
                      [Op.like]: `%${search}%`,
                    },
                  },
                },
                db.User,
              ],
            });
            break;
          case 5:
            respone = await db.Transaction.findAll({
              include: [
                db.TransactionState,
                db.Item,
                {
                  model: db.User,
                  where: {
                    username: {
                      [Op.like]: `%${search}%`,
                    },
                  },
                },
              ],
            });
            break;
          default:
            console.log(true);
            break;
        }
      } else {
        respone = await db.Transaction.findAll({
          include: [db.TransactionState, db.Item, db.User],
        });
      }
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const getProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const respone = await db.Item.findOne({
        where: {
          id: id,
        },
        include: [db.Category],
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
};
const updateTransaction = async (id, state) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Transaction.update(
        {
          TransactionStateId: state,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const newData = await db.Transaction.findAll({
        include: [db.TransactionState, db.Item, db.User],
      });
      resolve(newData);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllItem: getAllItem,
  getAllReviewsByProduct: getAllReviewsByProduct,
  addTransaction: addTransaction,
  getTransactionByUser: getTransactionByUser,
  getProductById: getProductById,
  getAllTransaction: getAllTransaction,
  updateTransaction: updateTransaction,
};

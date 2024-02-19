"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userID" });
      this.belongsTo(models.Item, { foreignKey: "itemID" });
      this.belongsTo(models.TransactionState, {
        foreignKey: "transactionStateID",
      });
    }
  }
  Transaction.init(
    {
      amount: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      paymentMethod: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

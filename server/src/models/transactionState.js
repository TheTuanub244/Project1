"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction);
    }
  }
  TransactionState.init(
    {
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionState",
    }
  );
  return TransactionState;
};

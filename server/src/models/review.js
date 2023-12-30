"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Item);
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "userID",
          allowNull: false,
          require: true,
        },
        targetKey: "id",
      });
      this.belongsTo(models.Item, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "itemID",
          allowNull: false,
          require: true,
        },
        targetKey: "id",
      });
    }
  }
  Review.init(
    {
      rate: DataTypes.DOUBLE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};

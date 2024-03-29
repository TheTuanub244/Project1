"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Review, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "userID",
          allowNull: false,
          require: true,
        },
        targetKey: "id",
      });
      this.hasMany(models.Transaction, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "userID",
          allowNull: false,
          require: true,
        },
        targetKey: "id",
      });
    }
  }
  User.init(
    {
      avatar: DataTypes.STRING,
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

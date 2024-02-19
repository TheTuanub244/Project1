"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "categoryId",
          allowNull: false,
          require: true,
        },
        targetKey: "id",
      });
      this.hasMany(models.Review);
    }
  }
  Item.init(
    {
      itemName: DataTypes.STRING,
      totalRate: DataTypes.DOUBLE,
      oldPrice: DataTypes.DOUBLE,
      newPrice: DataTypes.DOUBLE,
      brand: DataTypes.STRING,
      brandOrigin: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      material: DataTypes.STRING,
      genuine: DataTypes.BOOLEAN,
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      image4: DataTypes.STRING,
      description: DataTypes.STRING,
      quantity: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};

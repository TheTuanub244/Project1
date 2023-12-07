"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemName: {
        type: Sequelize.STRING,
      },
      totalRate: {
        type: Sequelize.DOUBLE,
      },
      oldPrice: {
        type: Sequelize.DOUBLE,
      },
      newPrice: {
        type: Sequelize.DOUBLE,
      },
      brand: {
        type: Sequelize.STRING,
      },
      brandOrigin: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      material: {
        type: Sequelize.STRING,
      },
      genuine: {
        type: Sequelize.BOOLEAN,
      },
      image1: {
        type: Sequelize.STRING,
      },
      image2: {
        type: Sequelize.STRING,
      },
      image3: {
        type: Sequelize.STRING,
      },
      image4: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.BIGINT,
      },
      categoryId: {
        type: Sequelize.INTEGER(1),
        references: {
          model: "Categories",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Items");
  },
};
